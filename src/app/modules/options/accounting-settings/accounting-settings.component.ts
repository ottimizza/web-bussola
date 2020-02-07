import { DescriptionService } from '@shared/services/description.service';
import { ScriptType } from '@shared/services/script-types.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { VariableInfo, AccountingVariableInfo } from '@shared/models/variables';
import { VariableService } from '@shared/services/variable.service';
import { ToastService } from '@shared/services/toast.service';
import { Description } from '@shared/models/description';

@Component({
	selector: 'app-accounting-settings',
	templateUrl: 'accounting-settings.component.html',
	styleUrls: ['accounting-settings.component.scss']
})
export class AccountingSettingsComponent implements OnInit, OnChanges {
	types: ScriptType[];
	selectedScript: ScriptType;
	variables: AccountingVariableInfo[] = [];
	descriptions: Description[] = [];

	constructor(
		private variableService: VariableService,
		private toastService: ToastService,
		private descriptionService: DescriptionService
	) {}

	ngOnInit() {
		this.variableService
			.requestScriptType()
			.subscribe((types: ScriptType[]) => {
				this.selectedScript = types[0];
				this.types = types;
				this.onScriptChanged();
			});
	}

	ngOnChanges() {}

	onScriptChanged() {
		this.requestVariables();
		this.requestDescriptionList();
	}

	requestVariables() {
		this.variableService
			.requestAccountingVariables(this.selectedScript.id)
			.subscribe((res: any) => {
				this.variables = res.content;
			});
	}

	requestDescriptionList() {
		this.descriptionService
			.getDescriptionList(null, this.selectedScript.id)
			.subscribe((descriptions: any) => {
				this.descriptions = descriptions.content;
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

	onDescriptionChanged(descriptions: Description[]) {
		this.descriptionService.updateDescriptionList(descriptions).subscribe(
			() => {
				this.toastService.show('Alterado com sucesso', 'success');
			},
			err => {
				console.log(err);
				this.toastService.show('Erro ao fazer alterações', 'danger');
			}
		);
	}
}
