import { AuthenticationService } from './../../core/authentication/authentication.service';
import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class KpiService {
	constructor(
		private http: HttpClient,
		private authService: AuthenticationService
	) {}

	getKpis(cnpj: string) {
		return this.requestGraphql({
			query:
				'query findKpi($cnpj: String, $id: BigInteger, $companyId: BigInteger,' +
				'$title: String, $kpiAlias: String, $subtitle: String, $description: String,' +
				'$graphType: Short, $columnX0Label: String, $label: String, $label2: String,' +
				'$label3: String, $label4: String, $visible: Boolean) { findKpi(cnpj: $cnpj,' +
				'id: $id, companyId: $companyId, title: $title, kpiAlias: $kpiAlias, subtitle:' +
				'$subtitle, description: $description, graphType: $graphType, columnX0Label: $columnX0Label,' +
				'label: $label, label2: $label2, label3: $label3, label4: $label4, visible: $visible)' +
				'{id, title, kpiAlias, chartType, labelArray, chartOptions, kpiDetail { id, columnX, valorArray} } }',
			variables: {
				cnpj
			}
		});
	}

	getLucroAnual(cnpj: string) {
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
}
