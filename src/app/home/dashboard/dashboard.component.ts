import { KpiFormatado } from './../../shared/models/kpi';
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	// tslint:disable-next-line: variable-name
	// private _kpis: KpiFormatado[];
	@Input() kpis: KpiFormatado[] = [];

	@Input() noKpis: boolean;

	// @Input() set kpis(value: KpiFormatado[]) {
	// 	this._kpis = value;
	// 	console.log(this._kpis);
	// }

	// get kpis(): KpiFormatado[] {
	// 	return this._kpis;
	// }

	constructor() {}

	ngOnInit(): void {}
}
