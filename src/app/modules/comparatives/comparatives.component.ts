import { map } from 'rxjs/operators';
import { Kpi } from './../../shared/models/kpi';
import { KpiService } from '@shared/services/kpi.service';
import { Component, OnInit } from '@angular/core';
import { Company } from '@shared/models/company';
import { KpiFormatado } from '@shared/models/kpi';
import { KpiDetail } from '@shared/models/kpi-detail';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CurrencyPipe } from '@angular/common';

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
		private deviceService: DeviceDetectorService,
		private cp: CurrencyPipe
	) {}

	ngOnInit(): void {}

	requestKpis() {
		this.isLoading = true;
		this.kpis = [];

		this.kpiService.getKpis(this.selectedCompany.cnpj).subscribe(
			(response: any) => {
				response.data.findKpi.forEach((kpi: Kpi) => {
					const kpiFormatado: KpiFormatado = {
						id: kpi.id,
						kpiAlias: kpi.kpiAlias,
						title: kpi.title,
						chartType: kpi.chartType,
						labelArray: kpi.labelArray,
						chartOptions: JSON.parse(kpi.chartOptions),
						roles: [],
						data: []
					};

					kpi.kpiDetail.forEach((detail: KpiDetail) => {
						const valArray = detail.valorStringArray
							.split(';')
							.map((item: string) => {
								return parseFloat(item) || null;
							});

						const arr = [
							this.kpiService.formatAxis(detail.columnX)
						];
						valArray.forEach(value => {
							arr.push(value);
							arr.push(
								this.cp.transform(
									value,
									'BRL',
									'symbol-narrow',
									'0.0-0'
								)
							);
						});

						kpiFormatado.data.push(arr);
					});

					kpiFormatado.labelArray.splice(0, 0, 'Month');

					for (
						let index = 1;
						index <=
						kpi.kpiDetail[0].valorStringArray.split(';').length;
						index++
					) {
						kpiFormatado.roles.push({
							role: 'tooltip',
							type: 'string',
							index
						});
					}

					this.kpis.push(kpiFormatado);
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
