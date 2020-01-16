import { ScriptType } from '@shared/services/script-types.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { VariableInfo } from '@shared/models/variables';
import { VariableService } from '@shared/services/variable.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
	selector: 'app-organization-settings',
	templateUrl: 'organization-settings.component.html',
	styleUrls: ['organization-settings.component.scss']
})
export class OrganizationSettingsComponent implements OnInit, OnChanges {
	types: ScriptType[];
	selectedType: ScriptType;
	variables: VariableInfo[] = [];

	constructor(
		private variableService: VariableService,
		private toastService: ToastService
	) {}

	ngOnInit() {
		this.requestVariables();
		this.variableService
			.requestScriptType()
			.subscribe((types: ScriptType[]) => {
				this.selectedType = types[0];
				this.types = types;
			});
	}

	ngOnChanges() {
		console.log(this.selectedType);
	}

	requestVariables() {
		this.variableService
			.requestOrganizationVariables()
			.subscribe((res: any[]) => {
				console.log(res);
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
