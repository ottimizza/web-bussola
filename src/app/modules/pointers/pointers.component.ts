import { map } from 'rxjs/operators';
import { User } from '@shared/models/User';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { MatDialog } from '@angular/material';
import { Component, PipeTransform } from '@angular/core';
import { Company } from '@shared/models/company';
import { Lucro } from '@shared/models/lucro';
import { KpiFormatado, Kpi } from '@shared/models/kpi';
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

	lucro: Lucro;
	kpis: KpiFormatado[] = [];
	isLoading = true;
	externalId = User.fromLocalStorage().organization.externalId;

	constructor(
		private kpiService: KpiService,
		private dialog: MatDialog,
		private cp: CurrencyPipe
	) {}

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
						roles: [],
						data: []
					};

					kpi.kpiDetail.forEach((detail: KpiDetail) => {
						const valArray = detail.valorStringArray
							.split(';')
							.map((item: string) => {
								return parseFloat(item) || null;
							});

						const arr = [
							this.kpiService.formatAxis(detail.columnX)
						];
						valArray.forEach(value => {
							arr.push(value);
							arr.push(
								this.cp.transform(
									value,
									'BRL',
									'symbol-narrow',
									'0.0-0'
								)
							);
						});

						kpiFormatado.data.push(arr);
					});

					kpiFormatado.labelArray.splice(0, 0, 'Month');

					for (
						let index = 1;
						index <=
						kpi.kpiDetail[0].valorStringArray.split(';').length;
						index++
					) {
						kpiFormatado.roles.push({
							role: 'tooltip',
							type: 'string',
							index
						});
					}

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

	openModal(kpiAlias: string) {
		// console.log(this.externalId);
		// console.log(this.cnpj);

		this.dialog.open(AnnotationsComponent, {
			width: '33rem',
			data: { externalId: this.selectedCompany.externalId, kpiAlias }
		});
	}
}
