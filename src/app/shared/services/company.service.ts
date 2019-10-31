import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';

@Injectable({ providedIn: 'root' })
export class CompanyService {
	constructor(private http: HttpClient, private authService: AuthService) {}

	getCompanies() {
		return this.http.get(
			`${AppComponent.apiOauthService}/api/v1/organizations?page_size=10&page_index=0`,
			{ headers: this.authService.headers() }
		);
	}

	findCompanyByCnpj(cnpj: string) {
		return this.http.post(
			`${AppComponent.appApi}/company/find/cnpj`,
			{
				cnpj: [cnpj]
			},
			{ headers: this.authService.headers() }
		);
	}

	updateCompany(cnpj: string, sector?: number): Observable<any> {
		return this.http.patch(
			`${AppComponent.appApi}/company`,
			{ cnpj, sector },
			{ headers: this.authService.headers() }
		);
	}
}
