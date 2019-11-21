import { Component, OnInit } from '@angular/core';
import { VariableInfo } from '@shared/models/variables';
import { VariableService } from '@shared/services/variable.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
	selector: 'app-organization-settings',
	templateUrl: 'organization-settings.component.html',
	styleUrls: ['organization-settings.component.scss']
})
export class OrganizationSettingsComponent implements OnInit {
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
			.requestOrganizationVariables()
			.subscribe((res: VariableInfo[]) => {
				this.variables = res;
			});
	}

	onVariableEdited(variableInfo: VariableInfo) {
		// const varIndex = this.variables.indexOf(variableInfo);
		this.variables[this.variables.indexOf(variableInfo)] = variableInfo;

		this.variableService.postOrganizationVariable(variableInfo).subscribe(
			res => this.toastService.show('Parâmetro alterado com sucesso'),
			() => this.toastService.show('Erro ao alterar parâmetro', 'danger')
		);
	}
}
