import { Lucro } from './../../shared/models/lucro';
import { KpiFormatado } from './../../shared/models/kpi';
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	@Input() lucro: Lucro;
	@Input() kpis: KpiFormatado[] = [];
	@Input() noKpis: boolean;
	@Input() isLoading: boolean;

	get valorLucro() {
		return this.lucro.value
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
			.replace('-', '');
	}

	constructor() {}

	ngOnInit(): void {}
}
