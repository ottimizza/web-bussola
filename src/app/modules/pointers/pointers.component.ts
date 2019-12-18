import { map } from 'rxjs/operators';
import { User } from '@shared/models/User';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { MatDialog } from '@angular/material';
import { Component, PipeTransform } from '@angular/core';
import { Company } from '@shared/models/company';
import { Profit } from '@shared/models/profit';
import { FormatedKpi, Kpi } from '@shared/models/kpi';
import { KpiService } from '@shared/services/kpi.service';
import { KpiDetail } from '@shared/models/kpi-detail';
import { AnnotationsComponent } from '@shared/components/annotations/annotations.component';
import { CurrencyPipe } from '@angular/common';

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

	constructor(
		private kpiService: KpiService,
		private dialog: MatDialog,
		private cp: CurrencyPipe
	) {}

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
				response.data.findKpi.forEach((kpi: Kpi) => {
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

						// valArray.forEach(value => {
						// 	arr.push(value);
						// 	arr.push(
						// 		this.cp.transform(
						// 			value,
						// 			'BRL',
						// 			'symbol-narrow',
						// 			'0.0-0'
						// 		)
						// 	);
						// 	// arr.push(
						// 	// 	`<div style="background-color: blue;"> <span> ${this.cp.transform(
						// 	// 		value,
						// 	// 		'BRL',
						// 	// 		'symbol-narrow',
						// 	// 		'0.0-0'
						// 	// 	)} </span> </div>`
						// 	// );
						// });

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

					// for (
					// 	let index = 1;
					// 	index <
					// 	kpi.kpiDetail[0].valorStringArray.split(';').length;
					// 	index = index + 2
					// ) {
					// 	formatedKpi.roles.push({
					// 		role: 'tooltip',
					// 		type: 'string',
					// 		index
					// 	});
					// }

					formatedKpi.labelArray.splice(0, 0, 'Month');

					console.log(formatedKpi);
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
		this.requestKpis();
	}

	openModal(kpiAlias: string) {
		// console.log(this.externalId);
		// console.log(this.cnpj);

		this.dialog.open(AnnotationsComponent, {
			width: '33rem',
			data: { externalId: this.selectedCompany.externalId, kpiAlias }
		});
	}
}
