import { User } from './../../core/models/User';
import { AuthenticationService } from '@app//authentication/authentication.service';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

@Injectable({ providedIn: 'root' })
export class KpiService {
	constructor(
		private httpClient: HttpClient,
		private authService: AuthenticationService
	) {}

	getKpis(cnpj: string, kind: number = 1) {
		return this.httpClient.get(
			`${environment.appApi}/kpi?page_size=50&cnpj=${cnpj}&kind=${kind}`,
			{ headers: this.authService.getAuthorizationHeaders() }
		);
	}

	getYearlyProfit(cnpj: string) {
		return this.httpClient.get(
			`${environment.appApi}/kpi/gain/${cnpj.replace(/\D/g, '')}`,
			{ headers: this.authService.getAuthorizationHeaders() }
		);
	}

	requestGraphql(body: any) {
		return this.httpClient.post(`${environment.appApi}/graphql`, body, {
			headers: this.authService.getAuthorizationHeaders()
		});
	}

	requestShareUrl() {
		return this.httpClient.post(
			`${environment.appApi}/charts/by_cnpj`,
			{
				cnpj: [window.sessionStorage.getItem('cnpj')],
				urlLogo: [
					User.fromLocalStorage().organization.avatar ||
						'https://www.ottimizza.com.br/zapcontabil/logos/logo_futuro.jpg'
				]
			},
			{ headers: this.authService.getAuthorizationHeaders() }
		);
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
