import { ToastService } from '../../shared/services/toast.service';
import { VariableService } from '../../shared/services/variable.service';
import { VariableInfo } from '../../shared/models/variables';
import { Company } from '../../shared/models/company';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-company-settings',
	templateUrl: 'company-settings.component.html',
	styleUrls: ['company-settings.component.scss']
})
export class CompanySettingsComponent implements OnInit {
	selectedCompany: Company;
	variables: VariableInfo[] = [];

	constructor(
		private variableService: VariableService,
		private toastService: ToastService
	) {}

	ngOnInit() {}

	requestVariables() {
		this.variableService
			.requestCompanyVariables(this.selectedCompany.id)
			.subscribe((res: VariableInfo[]) => {
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

	onCompanyChanged(selectedCompany: Company) {
		this.selectedCompany = selectedCompany;
		this.variables = [];
		this.requestVariables();
		this.requestMissingVariables();
	}

	onVariableEdited(variableInfo: VariableInfo) {
		this.variables.splice(this.variables.indexOf(variableInfo), 1);
		this.variableService
			.postVariable(variableInfo, this.selectedCompany.id)
			.subscribe(
				res => this.toastService.show('Parâmetro alterado com sucesso'),
				() => this.toastService.show('Erro ao alterar parâmetro', 'danger')
			);
	}
}
