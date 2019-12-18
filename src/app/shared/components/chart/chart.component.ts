import { FormatedKpi } from '@shared/models/kpi';
import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-chart',
	templateUrl: 'chart.component.html',
	styleUrls: ['chart.component.scss']
})
export class ChartComponent implements OnInit {
	@Input() kpi: FormatedKpi;
	@Input() noAnnotations = false;

	roles = [{ role: 'tooltip', type: 'string', index: 2 }];

	constructor() {}

	ngOnInit() {}
}
