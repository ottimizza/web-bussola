import { Component, OnInit, Input } from '@angular/core';
import { VariableInfo } from 'src/app/shared/models/variables';

@Component({
	selector: 'app-company-var-list',
	templateUrl: './company-var-list.component.html',
	styleUrls: ['./company-var-list.component.scss']
})
export class CompanyVarListComponent implements OnInit {
	@Input() variables: VariableInfo[];
	cols: any;

	constructor() {}

	ngOnInit(): void {
		this.cols = [
			{ field: 'name', header: 'Nome' },
			{ field: 'value', header: 'Valor' }
		];
	}
}
