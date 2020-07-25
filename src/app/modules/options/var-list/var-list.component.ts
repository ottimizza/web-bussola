import { VariableService } from '@shared/services/variable.service';
import { VariableInfo } from '@shared/models/variables';
import { User } from '@app/models/User';
import { Company } from '@shared/models/company';
import { AccountingVariableInfo } from '@shared/models/variables';
import { BalanceModalComponent } from './modal-balance/modal-balance.component';
import { debounceTime } from 'rxjs/operators';
import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	HostListener,
} from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '@shared/services/toast.service';
import { TokenInfo } from '@app/models/TokenInfo';

const regexStr = /(\d)|(\.)|(\+)|(\-)/;

@Component({
	selector: 'app-var-list',
	templateUrl: './var-list.component.html',
	styleUrls: ['./var-list.component.scss'],
})
export class VarListComponent implements OnInit {
	@Input() selectedCompany?: Company;
	@Output() onVariableEdited = new EventEmitter<
	VariableInfo | AccountingVariableInfo
	>();

	private _variables: VariableInfo[] | AccountingVariableInfo[] = [];

	public canManage = TokenInfo.fromLocalStorage().canManage();

	public INPUT_VALIDATION_EXCEPTION = 'is-a-true-text';

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

	userType = User.fromLocalStorage().type;

	@HostListener('keypress', ['$event']) onKeyPress(event: any) {
		if (event instanceof KeyboardEvent) {
			const input = event.target as HTMLInputElement;
			if (input.classList.contains(this.INPUT_VALIDATION_EXCEPTION)) {
				return event.key;
			}
		}
		return new RegExp(regexStr).test(event.key);
	}

	constructor(
		private matDialog: MatDialog,
		private variableService: VariableService,
		private toastService: ToastService
	) {}

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

	delete(variableInfo) {
		console.log(variableInfo);
		if (variableInfo.id && this.canManage) {
			if (variableInfo.variableId) {
				this.variableService
					.deleteCompanyVariable(variableInfo.id)
					.subscribe(
						() => {
							this.toastService.show(
								'Indicador excluído com sucesso',
								'success'
							);
							this.variables.splice(
								this.variables.indexOf(variableInfo),
								1
							);
						},
						(err) => {
							this.toastService.show(
								'Ocorreu um erro ao tentar excluir',
								'danger'
							);
						}
					);
			} else {
				this.variableService.deleteVariable(variableInfo.id).subscribe(
					() => {
						this.toastService.show(
							'Indicador excluído com sucesso',
							'success'
						);
						this.variables.splice(
							this.variables.indexOf(variableInfo),
							1
						);
					},
					(err) => {
						this.toastService.show(
							'Ocorreu um erro ao tentar excluir',
							'danger'
						);
					}
				);
			}
		}
	}

	openModal(variableInfo: VariableInfo | AccountingVariableInfo) {
		if (!this.canManage) { return; }
		this.matDialog.open(BalanceModalComponent, {
			width: '50rem',
			data: {
				variableInfo,
				cnpj: this.selectedCompany.cnpj,
				editVariable: (
					varInfo: VariableInfo | AccountingVariableInfo
				) => {
					this.onVarEdited(varInfo);
				},
			},
		});
	}
}
