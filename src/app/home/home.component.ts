import { KpiDetail } from './../shared/models/kpi-detail';
import { Company } from './../shared/models/company';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Kpi, KpiFormatado } from '../shared/models/kpi';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	data = [];
	selectedCompany: any;
	kpis: KpiFormatado[] = [];

	constructor(private dataService: DataService) {}

	ngOnInit(): void {
		this.dataService.getCompanies().subscribe((response: any) => {
			response.data.findCompany.forEach((c: Company) => {
				this.data.push(this.buildCompanyData(c));
			});
			this.selectedCompany = this.data[0];
			this.companyChanged();
		});
	}

	companyChanged() {
		this.kpis = [];

		this.dataService
			.getKpis(this.selectedCompany.id || this.selectedCompany.value.id)
			.subscribe((response: any) => {
				response.data.findKpi.forEach((kpi: Kpi) => {
					// tslint:disable-next-line: prefer-const
					let kpiFormatado: KpiFormatado = {
						id: kpi.id,
						title: kpi.title,
						chartType: kpi.chartType,
						labels: kpi.labels,
						data: []
					};

					kpi.kpiDetail.forEach((kpiDetail: KpiDetail) => {
						if (kpi.chartType === 'PieChart') {
							kpiDetail.valorArray.splice(0, 0, kpiDetail.columnX);
						} else {
							kpiDetail.valorArray.splice(
								0,
								0,
								new Date(
									kpiDetail.columnX.substring(
										0,
										kpiDetail.columnX.indexOf('/')
									) +
										'/01' +
										kpiDetail.columnX.substring(kpiDetail.columnX.indexOf('/'))
								)
							);
						}

						kpiFormatado.data.push(kpiDetail.valorArray);
					});

					this.kpis.push(kpiFormatado);
				});
				console.log(this.kpis);
			});
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
