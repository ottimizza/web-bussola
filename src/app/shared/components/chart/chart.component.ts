import { GoogleChart } from './google-chart';
import { FormatedKpi } from '@shared/models/kpi';
import {
	Component,
	Input,
	OnInit,
	ViewChild,
	ViewContainerRef,
	TemplateRef,
	AfterViewInit,
	ViewRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
	selector: 'app-chart',
	templateUrl: 'chart.component.html',
	styleUrls: ['chart.component.scss']
})
export class ChartComponent implements OnInit {
	@Input() kpi: FormatedKpi;

	roles = [{ role: 'tooltip', type: 'string', index: 2 }];

	resizeSubject = new Subject();

	constructor() {}

	ngOnInit() {
		this.resizeSubject
			.pipe(debounceTime(30))
			.subscribe((chart: GoogleChart) => chart.createChart());
	}

	onResize(event) {
		this.resizeSubject.next(event);
	}
}
