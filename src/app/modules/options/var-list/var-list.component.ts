import { User } from './../../../core/models/User';
import { Company } from './../../../shared/models/company';
import { AccountingVariableInfo } from './../../../shared/models/variables';
import { BalanceModalComponent } from './modal-balance/modal-balance.component';
import { debounceTime } from 'rxjs/operators';
import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	HostListener
} from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { VariableInfo } from '@shared/models/variables';
import { DeviceDetectorService } from 'ngx-device-detector';

const regexStr = /(\d)|(\.)|(\+)|(\-)/;

@Component({
	selector: 'app-var-list',
	templateUrl: './var-list.component.html',
	styleUrls: ['./var-list.component.scss']
})
export class VarListComponent implements OnInit {
	@Input() selectedCompany?: Company;
	@Output() onVariableEdited = new EventEmitter<
		VariableInfo | AccountingVariableInfo
	>();

	private _variables: VariableInfo[] | AccountingVariableInfo[] = [];

	get variables(): VariableInfo[] | AccountingVariableInfo[] {
		return this._variables;
	}

	@Input()
	set variables(variables: VariableInfo[] | AccountingVariableInfo[]) {
		this._variables = variables.sort(
			(
				a: VariableInfo | AccountingVariableInfo,
				b: VariableInfo | AccountingVariableInfo
			) => {
				if (a.variableCode > b.variableCode) {
					return 1;
				}
				if (a.variableCode < b.variableCode) {
					return -1;
				}
				return 0;
			}
		);
	}

	private variableSubject = new Subject<
		VariableInfo | AccountingVariableInfo
	>();

	@HostListener('keypress', ['$event']) onKeyPress(event: any) {
		return new RegExp(regexStr).test(event.key);
	}

	constructor(private matDialog: MatDialog) {}

	ngOnInit(): void {
		this.variableSubject
			.pipe(debounceTime(300))
			.subscribe((term: VariableInfo | AccountingVariableInfo) =>
				this.updateVariable(term)
			);
	}

	onVarEdited(variableInfo: VariableInfo | AccountingVariableInfo) {
		this.variableSubject.next(variableInfo);
	}

	updateVariable(variableInfo: any) {
		if (this.selectedCompany) {
			variableInfo.companyId = this.selectedCompany.id;
		}
		variableInfo.accountingId = User.fromLocalStorage().organization.id;
		this.onVariableEdited.emit(variableInfo);
	}

	openModal(variableInfo: VariableInfo | AccountingVariableInfo) {
		const that = this;
		this.matDialog.open(BalanceModalComponent, {
			width: '50rem',
			data: {
				variableInfo,
				cnpj: this.selectedCompany.cnpj,
				editVariable: (
					varInfo: VariableInfo | AccountingVariableInfo
				) => {
					that.onVarEdited(varInfo);
				}
			}
		});
	}
}
