import { AuthenticationService } from '@app//authentication/authentication.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';

@Injectable({ providedIn: 'root' })
export class CompanyService {
	constructor(
		private http: HttpClient,
		private authService: AuthenticationService
	) {}

	getCompanies(pageIndex: number, filter: string = '') {
		return this.http.get(
			`${environment.oauthBaseUrl}/api/v1/organizations`,
			{
				headers: this.authService.getAuthorizationHeaders(),
				params: {
					pageSize: '10',
					pageIndex: pageIndex.toString(),
					name: filter,
					active: 'true'
				}
			}
		);
	}

	findCompanyByCnpj(cnpj: string) {
		return this.http.post(
			`${environment.appApi}/company/find/cnpj`,
			{
				cnpj: [cnpj]
			},
			{ headers: this.authService.getAuthorizationHeaders() }
		);
	}

	updateCompany(cnpj: string, sector?: number): Observable<any> {
		return this.http.patch(
			`${environment.appApi}/company`,
			{ cnpj, sector },
			{ headers: this.authService.getAuthorizationHeaders() }
		);
	}
}
