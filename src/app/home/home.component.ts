import { Lucro } from './../shared/models/lucro';
import { AuthService } from './../shared/auth/auth.service';
import { KpiDetail } from './../shared/models/kpi-detail';
import { Company } from './../shared/models/company';
import { Component, OnInit } from '@angular/core';
import { KpiService } from '../shared/services/kpi.service';
import { Kpi, KpiFormatado } from '../shared/models/kpi';
import { CompanyService } from '../shared/services/company.service';

const dataRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	data: Company[];
	selectedCompany: Company;

	lucro: Lucro;
	kpis: KpiFormatado[] = [];
	noKpi = false;
	isLoading = true;

	constructor(
		private kpiService: KpiService,
		private companyService: CompanyService
	) {}

	ngOnInit(): void {
		const that = this;

		that.companyService.getCompanies().subscribe(
			(response: any) => {
				that.data = response.records;
				that.selectedCompany = response.records[0];

				that.requestKpis();
			},
			err => {
				console.log(err);
			}
		);
	}

	requestKpis() {
		this.lucro = undefined;
		this.kpis = [];
		this.isLoading = true;

		const that = this;

		const cnpj = that.selectedCompany.cnpj;

		that.kpiService.getLucroAnual(cnpj).subscribe(
			(lucro: Lucro) => {
				that.lucro = lucro;
			},
			err => {
				console.log(err);
			}
		);

		that.kpiService.getKpis(cnpj).subscribe(
			(response: any) => {
				response.data.findKpi.forEach((kpi: Kpi) => {
					const kpiFormatado: KpiFormatado = that.formatKpi(kpi);

					kpiFormatado.labelArray.splice(0, 0, 'Coluna');

					kpi.kpiDetail.forEach((detail: KpiDetail) => {
						detail.valorArray.splice(0, 0, that.formatAxis(detail.columnX));
						kpiFormatado.data.push(detail.valorArray);
					});

					that.kpis.push(kpiFormatado);
				});

				that.checkKpis();
			},
			err => {
				console.log(err);
			}
		);
	}

	checkKpis() {
		if (this.kpis[0]) {
			this.noKpi = false;
		} else {
			this.noKpi = true;
		}
		this.isLoading = false;
	}

	formatAxis(axis: string) {
		if (axis.match(dataRegex)) {
			const [day, month, year] = axis.split('/');
			return new Date(+year, +month - 1, +day);
		}
		return axis;
	}

	formatKpi(kpi: Kpi): KpiFormatado {
		return {
			id: kpi.id,
			kpiAlias: kpi.kpiAlias,
			title: kpi.title,
			chartType: kpi.chartType,
			labelArray: kpi.labelArray,
			chartOptions: JSON.parse(kpi.chartOptions),
			data: []
		};
	}

	logSomething(thing: any) {
		console.log(thing);
		return thing;
	}
}
