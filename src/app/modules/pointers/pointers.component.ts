import { User } from '@app/models/User';
import { MatDialog } from '@angular/material';
import { Component } from '@angular/core';
import { Company } from '@shared/models/company';
import { Profit } from '@shared/models/profit';
import { FormatedKpi, Kpi } from '@shared/models/kpi';
import { KpiService } from '@shared/services/kpi.service';
import { KpiDetail } from '@shared/models/kpi-detail';
import { AnnotationsComponent } from '@shared/components/annotations/annotations.component';

@Component({
	selector: 'app-pointers',
	templateUrl: './pointers.component.html',
	styleUrls: ['./pointers.component.scss']
})
export class PointersComponent {
	selectedCompany: Company;

	profit: Profit;
	kpis: FormatedKpi[] = [];
	isLoading = true;
	externalId = User.fromLocalStorage().organization.externalId;

	constructor(private kpiService: KpiService, private dialog: MatDialog) {}

	requestKpis() {
		this.isLoading = true;
		this.profit = undefined;
		this.kpis = [];

		this.kpiService.getYearlyProfit(this.selectedCompany.cnpj).subscribe(
			(profit: Profit) => {
				this.profit = profit;
			},
			err => {
				console.log(err);
			}
		);

		this.kpiService.getKpis(this.selectedCompany.cnpj).subscribe(
			(response: any) => {
				response.content.forEach((kpi: Kpi) => {
					const formatedKpi: FormatedKpi = {
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
								return parseFloat(item) || item;
							});

						const arr = [
							this.kpiService.formatAxis(detail.columnX)
						].concat(valArray);

						formatedKpi.data.push(arr);
					});

					let index = 1;
					formatedKpi.labelArray.forEach(() => {
						formatedKpi.roles.push({
							role: 'tooltip',
							type: 'string',
							index
						});

						index = index + 1;
					});

					formatedKpi.labelArray.splice(0, 0, 'Month');

					this.kpis.push(formatedKpi);
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
		if (!!selectedCompany) this.requestKpis();
	}

	openModal(kpiAlias: string) {
		this.dialog.open(AnnotationsComponent, {
			width: '33rem',
			data: { externalId: this.selectedCompany.externalId, kpiAlias }
		});
	}
}
