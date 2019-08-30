import { AuthService } from './../shared/auth/auth.service';
import { AppComponent } from './../app.component';
import { KpiDetail } from './../shared/models/kpi-detail';
import { Company } from './../shared/models/company';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Kpi, KpiFormatado } from '../shared/models/kpi';

const dataRegex = /((0[0-9]{1}|1[0-2]{1})\/[0-9]{4})/g;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	data = [];
	selectedCompany: any;

	kpis: KpiFormatado[] = [];
	noKpi = false;
	isLoading = true;

	constructor(
		private dataService: DataService,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.dataService.getCompanies().subscribe((response: any) => {
			response.data.findCompany.forEach((c: Company) => {
				this.data.push(this.buildCompanyData(c));
			});
			this.selectedCompany = this.data[0];
			this.requestKpis();
		});
	}

	requestKpis() {
		this.kpis = [];
		this.isLoading = true;

		const that = this;

		this.authService.checkTokenExpired(() => {
			that.dataService
				.getKpis(that.selectedCompany.id || that.selectedCompany.value.id)
				.subscribe((response: any) => {
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
				});
		});
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
			return new Date(
				axis.substring(0, axis.indexOf('/')) +
					'/01' +
					axis.substring(axis.indexOf('/'))
			);
		}
		return axis;
	}

	formatKpi(kpi: Kpi): KpiFormatado {
		return {
			id: kpi.id,
			title: kpi.title,
			chartType: kpi.chartType,
			labelArray: kpi.labelArray,
			chartOptions: JSON.parse(kpi.chartOptions),
			data: []
		};
	}

	buildCompanyData(c: Company) {
		return {
			label: c.name,
			value: {
				id: c.id,
				name: c.name,
				cnpj: c.cnpj
			}
		};
	}
}
