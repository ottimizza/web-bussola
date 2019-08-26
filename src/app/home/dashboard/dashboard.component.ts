import { KpiFormatado } from './../../shared/models/kpi';
import {
	Component,
	OnInit,
	Input,
	OnChanges,
	SimpleChanges
} from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnChanges {
	public show = true;

	options = {
		hAxis: {
			format: 'MM/yyyy'
		}
	};

	// tslint:disable-next-line: variable-name
	private _kpis: KpiFormatado[] = [];

	@Input() set kpis(value: KpiFormatado[]) {
		this._kpis = value;
		console.log('### KPIS ###    ' + JSON.stringify(this._kpis));
	}

	get kpis(): KpiFormatado[] {
		return this._kpis;
	}

	constructor() {}

	ngOnInit(): void {}

	ngOnChanges(changes: SimpleChanges) {}
}
