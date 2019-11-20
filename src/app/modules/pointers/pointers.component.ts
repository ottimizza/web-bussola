import { Component } from '@angular/core';
import { Company } from 'src/app/shared/models/company';
import { Lucro } from 'src/app/shared/models/lucro';
import { KpiFormatado, Kpi } from 'src/app/shared/models/kpi';
import { KpiService } from 'src/app/shared/services/kpi.service';
import { KpiDetail } from 'src/app/shared/models/kpi-detail';

const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

@Component({
	selector: 'app-pointers',
	templateUrl: './pointers.component.html',
	styleUrls: ['./pointers.component.scss']
})
export class PointersComponent {
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

					kpiFormatado.labelArray.splice(0, 0, 'Month');

					kpi.kpiDetail.forEach((detail: KpiDetail) => {
						detail.valorArray.splice(
							0,
							0,
							this.formatAxis(detail.columnX)
						);
						kpiFormatado.data.push(detail.valorArray);
					});

					this.kpis.push(kpiFormatado);
				});
				console.log(this.kpis);
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
			console.log(axis);
			return new Date(+year, +month - 1, +day);
		}
		return axis;
	}

	onCompanyChanged(selectedCompany: Company) {
		this.selectedCompany = selectedCompany;
		this.requestKpis();
	}
}
