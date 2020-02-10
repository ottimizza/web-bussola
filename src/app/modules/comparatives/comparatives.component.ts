import { map } from 'rxjs/operators';
import { Kpi } from '@shared/models/kpi';
import { KpiService } from '@shared/services/kpi.service';
import { Component, OnInit } from '@angular/core';
import { Company } from '@shared/models/company';
import { FormatedKpi } from '@shared/models/kpi';
import { KpiDetail } from '@shared/models/kpi-detail';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';
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
	isMobile = this.deviceService.isMobile();

	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(map(result => result.matches));

	constructor(
		private kpiService: KpiService,
		private deviceService: DeviceDetectorService,
		private breakpointObserver: BreakpointObserver
	) {}

	ngOnInit(): void {}

	requestKpis() {
		this.isLoading = true;
		this.kpis = [];

		this.kpiService.getKpis(this.selectedCompany.cnpj, 2).subscribe(
			(response: any) => {
				response.content.forEach((kpi: Kpi) => {
					const formatedKpi: FormatedKpi = {
						id: kpi.id,
						kpiAlias: kpi.kpiAlias,
						title: kpi.title,
						chartType: kpi.chartType.replace('Doughnut', 'Pie'),
						labelArray: kpi.labelArray,
						chartOptions: JSON.parse(kpi.chartOptions),
						roles: [],
						data: []
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
								(currentValue, index) => {
									formatedKpi.roles.push({
										role: 'tooltip',
										type: 'string',
										index: index + 1
									});
								}
							);
							formatedKpi.labelArray.splice(0, 0, 'Month');

							this.kpis.push(formatedKpi);
						});
				});
			},
			err => {
				console.log(err);
			},
			() => (this.isLoading = false)
		);
	}

	onCompanyChanged(selectedCompany: Company) {
		this.selectedCompany = selectedCompany;
		if (!!selectedCompany) this.requestKpis();
	}
}
