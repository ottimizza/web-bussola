import { ScriptType } from '@shared/services/script-types.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { VariableInfo, AccountingVariableInfo } from '@shared/models/variables';
import { VariableService } from '@shared/services/variable.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
	selector: 'app-accounting-settings',
	templateUrl: 'accounting-settings.component.html',
	styleUrls: ['accounting-settings.component.scss']
})
export class AccountingSettingsComponent implements OnInit, OnChanges {
	types: ScriptType[];
	selectedType: ScriptType;
	variables: AccountingVariableInfo[] = [];

	constructor(
		private variableService: VariableService,
		private toastService: ToastService
	) {}

	ngOnInit() {
		this.variableService
			.requestScriptType()
			.subscribe((types: ScriptType[]) => {
				this.selectedType = types[0];
				this.types = types;
				this.requestVariables();
			});
	}

	ngOnChanges() {}

	requestVariables() {
		this.variableService
			.requestAccountingVariables(this.selectedType.id)
			.subscribe((res: any) => {
				this.variables = res.content;
			});
	}

	onVariableEdited(variableInfo: AccountingVariableInfo) {
		// const varIndex = this.variables.indexOf(variableInfo);
		this.variables[this.variables.indexOf(variableInfo)] = variableInfo;

		this.variableService.postAccountingVariable(variableInfo).subscribe(
			res => this.toastService.show('Parâmetro alterado com sucesso'),
			() => this.toastService.show('Erro ao alterar parâmetro', 'danger')
		);
	}
}
