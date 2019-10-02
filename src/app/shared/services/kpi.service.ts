import { AuthService } from '../auth/auth.service';
import { AppComponent } from 'src/app/app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class KpiService {
	constructor(private http: HttpClient, private authService: AuthService) {}

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
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + this.authService.getToken()
		});

		return this.http.get(
			`${AppComponent.appApi}/kpi/gain/${cnpj.replace(/\D/g, '')}`,
			{
				headers
			}
		);
	}

	requestGraphql(body: any) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + this.authService.getToken()
		});

		return this.http.post(`${AppComponent.appApi}/graphql`, body, { headers });
	}
}
