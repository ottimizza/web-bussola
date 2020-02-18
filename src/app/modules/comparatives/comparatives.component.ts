import { map, debounceTime } from 'rxjs/operators';
import { Kpi } from '@shared/models/kpi';
import { KpiService } from '@shared/services/kpi.service';
import { Component, OnInit } from '@angular/core';
import { Company } from '@shared/models/company';
import { FormatedKpi } from '@shared/models/kpi';
import { KpiDetail } from '@shared/models/kpi-detail';
import { Observable, Subject } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
	selector: 'app-comparatives',
	templateUrl: 'comparatives.component.html',
	styleUrls: ['comparatives.component.scss']
})
export class ComparativesComponent implements OnInit {
	selectedCompany: Company;
	kpis: FormatedKpi[] = [];

	isLoading = true;
	isPortrait = window.innerHeight > window.innerWidth;

	resizeSubject = new Subject();

	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(map(result => result.matches));

	constructor(
		private kpiService: KpiService,
		private breakpointObserver: BreakpointObserver
	) {}

	ngOnInit() {
		this.resizeSubject.pipe(debounceTime(30)).subscribe(() => {
			const kpis = this.kpis;
			this.kpis = [];
			setTimeout(() => {
				this.kpis = kpis;
			}, 1);
		});
	}

	requestKpis() {
		this.isLoading = true;
		this.kpis = [];

		this.kpiService.getKpis(this.selectedCompany.cnpj, 2).subscribe(
			(response: any) => {
				response.content.forEach((kpi: Kpi, index: number) => {
					const formatedKpi: FormatedKpi = {
						id: kpi.id,
						kpiAlias: kpi.kpiAlias,
						title: kpi.title,
						chartType: kpi.chartType.replace('Doughnut', 'Pie'),
						labelArray: kpi.labelArray,
						chartOptions: JSON.parse(kpi.chartOptions),
						roles: [],
						data: [],
						index
					};

					this.kpiService
						.getKpiDetails(kpi.id)
						.subscribe((details: any) => {
							details.content.forEach((detail: KpiDetail) => {
								formatedKpi.data.push(
									this.kpiService.formatKpiDetail(detail)
								);
							});

							formatedKpi.labelArray.forEach(
								(currentValue, i) => {
									formatedKpi.roles.push({
										role: 'tooltip',
										type: 'string',
										index: i + 1
									});
								}
							);
							formatedKpi.labelArray.splice(0, 0, 'Month');

							this.kpis.push(formatedKpi);
							this.kpis.sort((a, b) => {
								if (a.index > b.index) {
									return 1;
								}
								if (a.index < b.index) {
									return -1;
								}
								return 0;
							});
							this.isLoading = false;
						});
				});
			},
			err => {
				console.log(err);
			}
		);
	}

	onCompanyChanged(selectedCompany: Company) {
		this.selectedCompany = selectedCompany;
		if (!!selectedCompany) this.requestKpis();
	}
}
