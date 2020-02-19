import { KpiDetail } from './../models/kpi-detail';
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

	getKpiDetails(kpiId) {
		return this.httpClient.get(`${environment.appApi}/kpi/detail`, {
			headers: this.authService.getAuthorizationHeaders(),
			params: { kpiId }
		});
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
						`${window.location.origin}/assets/img/logo-default.png`
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

	formatKpiDetail(detail: KpiDetail) {
		const valArray = detail.valorStringArray
			.split(';')
			.map((item: string) => {
				if (item === 'null') return null;
				if (item === '0.0') return 0;
				return parseFloat(item) || item;
			});

		const arr = [this.formatAxis(detail.columnX)].concat(valArray);

		return arr;
	}
}
