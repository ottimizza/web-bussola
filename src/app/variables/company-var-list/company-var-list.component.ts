import { ToastService } from './../../shared/services/toast.service';
import { VariablesService } from './../../shared/services/variables.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Company } from './../../shared/models/company';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { VariableInfo } from 'src/app/shared/models/variables';
import { Subject } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
	selector: 'app-company-var-list',
	templateUrl: './company-var-list.component.html',
	styleUrls: ['./company-var-list.component.scss']
})
export class CompanyVarListComponent implements OnInit {
	@Input() variables: VariableInfo[];
	@Input() selectedCompany: Company;

	source: any;

	private variableSubject = new Subject<VariableInfo>();

	constructor(
		private variablesService: VariablesService,
		private toastService: ToastService
	) {}

	ngOnInit(): void {
		this.variableSubject
			.pipe(debounceTime(300))
			.subscribe((term: VariableInfo) => this.updateVariable(term));
	}

	onVarEdited(variableInfo: VariableInfo) {
		this.variableSubject.next(variableInfo);
	}

	updateVariable(variableInfo: VariableInfo) {
		this.variablesService
			.postVariable(variableInfo)
			.subscribe(
				res => this.toastService.show('Código alterado com sucesso'),
				() =>
					this.toastService.show('Erro ao alterar código da conta', 'danger')
			);
	}
}
