import { Component } from '@angular/core';
import { Company } from '@shared/models/company';
import { Lucro } from '@shared/models/lucro';
import { KpiFormatado, Kpi } from '@shared/models/kpi';
import { KpiService } from '@shared/services/kpi.service';
import { KpiDetail } from '@shared/models/kpi-detail';

@Component({
	selector: 'app-pointers',
	templateUrl: './pointers.component.html',
	styleUrls: ['./pointers.component.scss']
})
export class PointersComponent {
	selectedCompany: Company;

	lucro: Lucro;
	kpis: KpiFormatado[] = [];
	isLoading = true;

	constructor(private kpiService: KpiService) {}

	requestKpis() {
		this.isLoading = true;
		this.lucro = undefined;
		this.kpis = [];

		this.kpiService.getLucroAnual(this.selectedCompany.cnpj).subscribe(
			(lucro: Lucro) => {
				this.lucro = lucro;
			},
			err => {
				console.log(err);
			}
		);

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
						data: []
					};

					kpiFormatado.labelArray.splice(0, 0, 'Month');

					kpi.kpiDetail.forEach((detail: KpiDetail) => {
						kpiFormatado.data.push(
							[this.kpiService.formatAxis(detail.columnX)].concat(
								detail.valorStringArray
									.split(';')
									.map((item: string) => {
										return parseFloat(item) || null;
									})
							)
						);
					});

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
