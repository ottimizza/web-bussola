import { Kpi } from './../../shared/models/kpi';
import { KpiService } from '@shared/services/kpi.service';
import { Component, OnInit } from '@angular/core';
import { Company } from '@shared/models/company';
import { KpiFormatado } from '@shared/models/kpi';
import { KpiDetail } from '@shared/models/kpi-detail';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
	selector: 'app-comparatives',
	templateUrl: 'comparatives.component.html',
	styleUrls: ['comparatives.component.scss']
})
export class ComparativesComponent implements OnInit {
	selectedCompany: Company;
	kpis: KpiFormatado[] = [];

	isLoading = true;
	isPortrait = window.innerHeight > window.innerWidth;
	isMobile = this.deviceService.isMobile();

	constructor(
		private kpiService: KpiService,
		private deviceService: DeviceDetectorService
	) {}

	ngOnInit(): void {}

	requestKpis() {
		this.isLoading = true;
		this.kpis = [];

		this.kpiService.getKpis(this.selectedCompany.cnpj, 2).subscribe(
			(response: any) => {
				response.data.findKpi.forEach((kpi: Kpi) => {
					const kpiFormatado: KpiFormatado = {
						id: kpi.id,
						kpiAlias: kpi.kpiAlias,
						title: kpi.title,
						chartType: kpi.chartType,
						labelArray: kpi.labelArray,
						chartOptions: JSON.parse(kpi.chartOptions),
						data: []
					};

					kpiFormatado.labelArray.splice(0, 0, 'Month');

					kpi.kpiDetail.forEach((detail: KpiDetail) => {
						console.log(detail);
						detail.valorArray.splice(
							0,
							0,
							this.kpiService.formatAxis(detail.columnX)
						);
						kpiFormatado.data.push(detail.valorArray);
					});

					this.kpis = [...this.kpis, kpiFormatado];
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
		this.requestKpis();
	}
}
