import { AuthenticationService } from '@app//authentication/authentication.service';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

@Injectable({ providedIn: 'root' })
export class KpiService {
	constructor(
		private http: HttpClient,
		private authService: AuthenticationService
	) {}

	getKpis(cnpj: string, kind: number = 1) {
		return this.requestGraphql({
			query:
				'query findKpi($cnpj: String, $id: BigInteger, $companyId: BigInteger,' +
				'$title: String, $kpiAlias: String, $subtitle: String, $description: String,' +
				'$graphType: Short, $columnX0Label: String, $label: String, $label2: String,' +
				'$label3: String, $label4: String, $kind: Short, $visible: Boolean) { findKpi(cnpj: $cnpj,' +
				'id: $id, companyId: $companyId, title: $title, kpiAlias: $kpiAlias, subtitle:' +
				'$subtitle, description: $description, graphType: $graphType, columnX0Label: $columnX0Label,' +
				'label: $label, label2: $label2, label3: $label3, label4: $label4, kind: $kind, visible: $visible)' +
				'{id, title, kpiAlias, chartType, labelArray, chartOptions, kpiDetail { id, columnX, valorStringArray} } }',
			variables: {
				cnpj,
				kind
			}
		});
	}

	getYearlyProfit(cnpj: string) {
		return this.http.get(
			`${environment.appApi}/kpi/gain/${cnpj.replace(/\D/g, '')}`,
			{
				headers: this.authService.getAuthorizationHeaders()
			}
		);
	}

	requestGraphql(body: any) {
		return this.http.post(`${environment.appApi}/graphql`, body, {
			headers: this.authService.getAuthorizationHeaders()
		});
	}

	formatAxis(axis: string) {
		if (axis.match(dateRegex)) {
			const [day, month, year] = axis.split('/');
			return {
				v: new Date(+year, +month - 1, +day),
				f: `${month}/${year}`
			};
		}
		return axis;
	}
}
