import { DescriptionService } from '@shared/services/description.service';
import { Component, OnInit } from '@angular/core';
import { VariableService } from '@shared/services/variable.service';
import { CompanyService } from '@shared/services/company.service';
import { VariableInfo } from '@shared/models/variables';
import { ToastService } from '@shared/services/toast.service';
import { Description } from '@shared/models/description';
import { Company } from '@shared/models/company';
import { TokenInfo } from '@app/models/TokenInfo';
import { SectorService } from '@shared/services/sector.service';

@Component({
	selector: 'app-company-settings',
	templateUrl: 'company-settings.component.html',
	styleUrls: ['company-settings.component.scss'],
})
export class CompanySettingsComponent implements OnInit {
	sectors: { label: string, value: number }[] = [];

	selectedCompany: Company;
	selectedSector: number;
	variables: VariableInfo[] = [];
	shareCompanyData = false;

	// pointerDescriptions: Description[] = [];
	// comparativeDescriptions: Description[] = [];

	canManage: boolean;

	constructor(
		private variableService: VariableService,
		private companyService: CompanyService,
		private toastService: ToastService,
		private descriptionService: DescriptionService,
		private sectorService: SectorService
	) {}

	ngOnInit() {
		this.sectorService.get().subscribe(results => {
			this.sectors = results;
		})
		this.canManage = TokenInfo.fromLocalStorage().canManage();
	}

	requestVariables() {
		this.variableService
			.requestCompanyVariables(this.selectedCompany.id)
			.subscribe((res: any) => {
				this.variables = this.variables.concat(res);
			});
	}

	requestMissingVariables() {
		this.variableService
			.requestMissingVariables(this.selectedCompany.id)
			.subscribe((res: VariableInfo[]) => {
				this.variables = this.variables.concat(res);
			});
	}

	findSector() {
		this.companyService
			.findCompanyByCnpj(this.selectedCompany.cnpj)
			.subscribe((companies) => {
				this.selectedSector = companies[0].sector || null;
			});
	}

	// requestDescriptionList() {
	// 	this.descriptionService
	// 		.getDescriptionList(this.selectedCompany.cnpj)
	// 		.subscribe((descriptions: any) => {
	// 			descriptions.content.forEach((description: Description) => {
	// 				+description.kpiAlias < 60
	// 					? this.pointerDescriptions.push(description)
	// 					: this.comparativeDescriptions.push(description);
	// 			});
	// 		});
	// }

	onCompanyChanged(selectedCompany: Company) {
		if (!!selectedCompany) {
			this.selectedCompany = selectedCompany;

			this.variables = [];
			// this.pointerDescriptions = [];
			// this.comparativeDescriptions = [];

			this.findSector();
			// this.requestDescriptionList();
			this.requestVariables();
			this.requestMissingVariables();
		}
	}

	onVariableEdited(variableInfo: VariableInfo) {
		if (!this.canManage) { return; }
		this.variables[this.variables.indexOf(variableInfo)] = variableInfo;

		this.variableService.postVariable(variableInfo).subscribe(
			(res) =>
				this.toastService.show(
					'Parâmetro alterado com sucesso',
					'success'
				),
			() => this.toastService.show('Erro ao alterar parâmetro', 'danger')
		);
	}

	onDescriptionChanged(descriptions: Description[]) {
		if (!this.canManage) { return; }
		this.descriptionService.updateDescriptionList(descriptions).subscribe(
			() => {
				this.toastService.show('Alterado com sucesso', 'success');
			},
			(err) => {
				console.log(err);
				this.toastService.show('Erro ao fazer alterações', 'danger');
			}
		);
	}

	updateSetor() {
		this.companyService
			.updateCompany(
				this.selectedCompany.cnpj,
				this.selectedSector ? this.selectedSector : 0
			)
			.subscribe(
				() => {
					this.toastService.show('Setor salvo..');
				},
				(err) => {
					console.log(err);
					this.toastService.show(
						'Ocorreu um erro, tente novamente.',
						'danger'
					);
				}
			);
	}
}
