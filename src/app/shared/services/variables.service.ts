import { AppComponent } from 'src/app/app.component';
import { AuthService } from './../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class VariablesService {
	constructor(
		private httpClient: HttpClient,
		private authService: AuthService
	) {}

	requestCompanyVariables(companyId: number) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + this.authService.token
		});
		return this.httpClient.get(
			`${AppComponent.appApi}/variables/organization/byCompany/${companyId}`,
			{ headers }
		);
	}
}
