import { Kpi } from './../../shared/models/kpi';
import { KpiService } from '@shared/services/kpi.service';
import { Component, OnInit } from '@angular/core';
import { Company } from '@shared/models/company';
import { KpiFormatado } from '@shared/models/kpi';
import { KpiDetail } from '@shared/models/kpi-detail';

@Component({
	selector: 'app-comparatives',
	templateUrl: 'comparatives.component.html',
	styleUrls: ['comparatives.component.scss']
})
export class ComparativesComponent implements OnInit {
	selectedCompany: Company;
	kpis: KpiFormatado[] = [];
	isLoading = true;

	constructor(private kpiService: KpiService) {}

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
						detail.valorArray.splice(
							0,
							0,
							this.kpiService.formatAxis(detail.columnX)
						);
						kpiFormatado.data.push(detail.valorArray);
					});

					// this.kpis.push(kpiFormatado);
					this.kpis = [...this.kpis, kpiFormatado]
					// this.kpis.push(kpiFormatado);
					console.log(this.kpis)
				});
				console.log(this.kpis);
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
