import { Lucro } from './../shared/models/lucro';
import { KpiDetail } from './../shared/models/kpi-detail';
import { Company } from './../shared/models/company';
import { Component, OnInit } from '@angular/core';
import { KpiService } from '../shared/services/kpi.service';
import { Kpi, KpiFormatado } from '../shared/models/kpi';

const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	companies: Company[];
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

					kpiFormatado.labelArray.splice(0, 0, 'Coluna');

					kpi.kpiDetail.forEach((detail: KpiDetail) => {
						detail.valorArray.splice(0, 0, this.formatAxis(detail.columnX));
						kpiFormatado.data.push(detail.valorArray);
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

	formatAxis(axis: string) {
		if (axis.match(dateRegex)) {
			const [day, month, year] = axis.split('/');
			return new Date(+year, +month - 1, +day);
		}
		return axis;
	}

	onCompanyChanged(selectedCompany: Company) {
		this.selectedCompany = selectedCompany;
		this.requestKpis();
	}
}
