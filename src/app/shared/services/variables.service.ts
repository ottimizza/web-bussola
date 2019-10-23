import { VariableInfo } from 'src/app/shared/models/variables';
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
		return this.httpClient.get(
			`${AppComponent.appApi}/variables/organization/byCompany/${companyId}`,
			{ headers: this.headers() }
		);
	}

	requestMissingVariables(companyId: number) {
		return this.httpClient.get(
			`${AppComponent.appApi}/variables/organization/missing/${companyId}`,
			{ headers: this.headers() }
		);
	}

	postVariable(variableInfo: VariableInfo) {
		return this.httpClient.post(
			`${AppComponent.appApi}/variables/organization`,
			{
				id: variableInfo.id,
				organizationId: variableInfo.organizationId,
				variableId: variableInfo.variableId,
				accountingCode: variableInfo.accountingCode
			},
			{ headers: this.headers() }
		);
	}

	private headers = (): HttpHeaders =>
		new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + this.authService.token
		});
}
