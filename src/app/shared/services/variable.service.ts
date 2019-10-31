import { VariableInfo } from './../models/variables';
import { UserService } from '../user/user.service';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class VariableService {
	constructor(
		private httpClient: HttpClient,
		private authService: AuthService,
		private userService: UserService
	) {}

	requestOrganizationVariables() {
		return this.httpClient.get(
			`${AppComponent.appApi}/variables/byOrganization/${this.userService.currentUserValue.organization.id}`,
			{ headers: this.authService.headers() }
		);
	}

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

	postOrganizationVariable(variableInfo: VariableInfo) {
		return this.httpClient.post(
			`${AppComponent.appApi}/variables`,
			{
				id: variableInfo.id,
				organizationId: this.userService.currentUserValue.organization.id,
				accountingCode: variableInfo.accountingCode
			},
			{ headers: this.authService.headers() }
		);
	}
}
