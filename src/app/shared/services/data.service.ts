import { AuthService } from './../auth/auth.service';
import { AppComponent } from 'src/app/app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService {
	constructor(private http: HttpClient, private authService: AuthService) {}

	getCompanies() {
		return this.requestGraphql({
			query:
				// tslint:disable-next-line: max-line-length
				'query findCompany($id: BigInteger, $cnpj: [String], $name: String) { findCompany(id: $id, cnpj: $cnpj, name: $name) { id, cnpj, name } }',
			variables: {
				cnpj: ['04.573.344/0001-40', '86.946.953/0001-62']
			}
		});
	}

	getKpis(companyId: number) {
		return this.requestGraphql({
			query:
				// tslint:disable-next-line: max-line-length
				'query findKpi($id: BigInteger, $companyId: BigInteger, $title: String, $kpiAlias: String, $subtitle: String, $description: String, $graphType: Short, $columnX0Label: String, $label: String, $label2: String, $label3: String, $label4: String, $visible: Boolean) { findKpi(id: $id, companyId: $companyId, title: $title, kpiAlias: $kpiAlias, subtitle: $subtitle, description: $description, graphType: $graphType, columnX0Label: $columnX0Label, label: $label, label2: $label2, label3: $label3, label4: $label4, visible: $visible) { title, chartType, labelArray, chartOptions, kpiDetail { columnX, valorArray} } }',
			variables: {
				companyId
			}
		});
	}

	getLucroAnual(companyId: number) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + this.authService.getToken()
		});

		return this.http.get(`${AppComponent.appApi}/kpi/find/gain/${companyId}`, {
			headers
		});
	}

	requestGraphql(body: any) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + this.authService.getToken()
		});

		return this.http.post(`${AppComponent.appApi}/graphql`, body, { headers });
	}
}
