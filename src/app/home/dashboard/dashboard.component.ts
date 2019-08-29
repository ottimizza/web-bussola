import { KpiFormatado } from './../../shared/models/kpi';
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	@Input() kpis: KpiFormatado[] = [];
	@Input() noKpis: boolean;
	@Input() isLoading: boolean;

	constructor() {}

	ngOnInit(): void {}
}
