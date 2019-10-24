import { VariableInfo } from 'src/app/shared/models/variables';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from './../auth/auth.service';
import { HttpClient } from '@angular/common/http';
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
			{ headers: this.authService.headers() }
		);
	}

	requestMissingVariables(companyId: number) {
		return this.httpClient.get(
			`${AppComponent.appApi}/variables/organization/missing/${companyId}`,
			{ headers: this.authService.headers() }
		);
	}

	postVariable(variableInfo: VariableInfo, companyId?: number) {
		return this.httpClient.post(
			`${AppComponent.appApi}/variables/organization`,
			{
				id: variableInfo.id,
				organizationId: variableInfo.organizationId || companyId,
				variableId: variableInfo.variableId,
				accountingCode: variableInfo.accountingCode
			},
			{ headers: this.authService.headers() }
		);
	}
}
