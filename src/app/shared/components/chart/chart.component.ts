import { KpiFormatado } from '@shared/models/kpi';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-chart',
	templateUrl: 'chart.component.html',
	styleUrls: ['chart.component.scss']
})
export class ChartComponent {
	@Input() kpi: KpiFormatado;
	@Input() noAnnotations = false;

	constructor() {}
}
