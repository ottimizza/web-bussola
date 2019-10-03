import { ModalDashboardComponent } from './modal-dashboard/modal-dashboard.component';
import { Lucro } from './../../shared/models/lucro';
import { KpiFormatado } from './../../shared/models/kpi';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	@Input() lucro: Lucro;
	@Input() externalId: string;
	@Input() kpis: KpiFormatado[] = [];
	@Input() noKpis: boolean;
	@Input() isLoading: boolean;

	columnNames = [
		'Year',
		'Sales',
		{ type: 'string', role: 'tooltip' },
		'Teste',
		{ type: 'string', role: 'tooltip' }
	];

	get valorLucro() {
		return this.lucro.value
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
			.replace('-', '');
	}

	constructor(private dialog: MatDialog) {}

	ngOnInit(): void {}

	openModal(kpiAlias: number) {
		const that = this;
		const externalId = that.externalId; // ?????????
		that.dialog.open(ModalDashboardComponent, {
			width: '33rem',
			data: { externalId, kpiAlias }
		});
	}
}
