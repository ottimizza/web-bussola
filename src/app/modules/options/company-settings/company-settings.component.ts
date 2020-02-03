import { DescriptionService } from '@shared/services/description.service';
import { Description } from '@shared/models/description';
import { Component, OnInit } from '@angular/core';
import { VariableService } from '@shared/services/variable.service';
import { CompanyService } from '@shared/services/company.service';
import { ToastService } from '@shared/services/toast.service';
import { Company } from '@shared/models/company';
import { VariableInfo } from '@shared/models/variables';

@Component({
	selector: 'app-company-settings',
	templateUrl: 'company-settings.component.html',
	styleUrls: ['company-settings.component.scss']
})
export class CompanySettingsComponent implements OnInit {
	sectors = [
		{ label: 'Construção Civil', value: 1 },
		{ label: 'Comércio Varejista', value: 2 },
		{ label: 'Tecnologia', value: 3 },
		{ label: 'Alimentação', value: 4 }
	];

	selectedCompany: Company;
	selectedSector: number;
	variables: VariableInfo[] = [];
	shareCompanyData = false;

	descriptions: Description[] = [];

	constructor(
		private variableService: VariableService,
		private companyService: CompanyService,
		private toastService: ToastService,
		private descriptionService: DescriptionService
	) {}

	ngOnInit() {}

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
			.subscribe(companies => {
				const company = companies[0];
				this.selectedSector = company.sector;
			});
	}

	requestDescriptionList() {
		this.descriptionService
			.getDescriptionList('09.008.007/0001-99')
			.subscribe((descriptions: any) => {
				this.descriptions = descriptions.content;
			});
	}

	onCompanyChanged(selectedCompany: Company) {
		if (!!selectedCompany) {
			this.selectedCompany = selectedCompany;
			this.variables = [];
			this.findSector();
			this.requestDescriptionList();
			this.requestVariables();
			this.requestMissingVariables();
		}
	}

	onVariableEdited(variableInfo: VariableInfo) {
		this.variables[this.variables.indexOf(variableInfo)] = variableInfo;

		this.variableService.postVariable(variableInfo).subscribe(
			res => this.toastService.show('Parâmetro alterado com sucesso'),
			() => this.toastService.show('Erro ao alterar parâmetro', 'danger')
		);
	}

	onDescriptionChanged(descriptions: Description[]) {
		this.descriptionService
			.updateDescriptionList(descriptions)
			.subscribe(() => {
				console.log(descriptions);
			});
	}

	updateSetor() {
		this.companyService
			.updateCompany(
				this.selectedCompany.cnpj,
				this.shareCompanyData && this.selectedSector
					? this.selectedSector
					: 0
			)
			.subscribe(
				() => {
					this.toastService.show('Setor salvo..');
				},
				err => {
					console.log(err);
					this.toastService.show(
						'Ocorreu um erro, tente novamente.',
						'danger'
					);
				}
			);
	}
}
