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
					const kpiFormatado: KpiFormatado = this.formatKpi(kpi);
					kpiFormatado.labelArray.splice(0, 0, 'Coluna');

					kpi.kpiDetail.forEach((detail: KpiDetail) => {
						detail.valorArray.splice(0, 0, this.formatAxis(detail.columnX));
						kpiFormatado.data.push(detail.valorArray);
					});

					this.kpis.push(kpiFormatado);
				});

				this.checkKpis();
			});
	}

	checkKpis() {
		if (this.kpis[0]) {
			this.noKpi = false;
		} else {
			this.noKpi = true;
		}
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
