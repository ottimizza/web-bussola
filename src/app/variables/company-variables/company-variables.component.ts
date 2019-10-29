import { ToastService } from './../../shared/services/toast.service';
import { VariableService } from '../../shared/services/variable.service';
import { VariableInfo } from './../../shared/models/variables';
import { Company } from './../../shared/models/company';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-company-variables',
	templateUrl: 'company-variables.component.html',
	styleUrls: ['company-variables.component.scss']
})
export class CompanyVariablesComponent implements OnInit {
	selectedCompany: Company;
	variables: VariableInfo[] = [];

	constructor(
		private variableService: VariableService,
		private toastService: ToastService
	) {}

	ngOnInit() {}

	onCompanyChanged(selectedCompany: Company) {
		this.selectedCompany = selectedCompany;
		this.variables = [];
		this.requestVariables();
		this.requestMissingVariables();
	}

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
