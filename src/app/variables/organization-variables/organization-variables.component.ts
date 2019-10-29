import { VariableService } from './../../shared/services/variable.service';
import { Component, OnInit } from '@angular/core';
import { VariableInfo } from 'src/app/shared/models/variables';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
	selector: 'app-organization-variables',
	templateUrl: 'organization-variables.component.html',
	styleUrls: ['organization-variables.component.scss']
})
export class OrganizationVariablesComponent implements OnInit {
	variables: VariableInfo[] = [];

	constructor(
		private variableService: VariableService,
		private toastService: ToastService
	) {}

	ngOnInit() {
		this.requestVariables();
	}

	requestVariables() {
		this.variableService
			.requestAccountingVariables()
			.subscribe((res: VariableInfo[]) => {
				this.variables = res;
			});
	}

	onVariableEdited(variableInfo: VariableInfo) {
		this.variables.splice(this.variables.indexOf(variableInfo), 1);
		this.variableService
			.postOrganizationVariable(variableInfo)
			.subscribe(
				res => this.toastService.show('Parâmetro alterado com sucesso'),
				() => this.toastService.show('Erro ao alterar parâmetro', 'danger')
			);
	}
}
