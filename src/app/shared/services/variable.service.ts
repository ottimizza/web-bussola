import { User } from '@app/models/User';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { VariableInfo, AccountingVariableInfo } from '@shared/models/variables';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class VariableService {
	constructor(
		private httpClient: HttpClient,
		private authService: AuthenticationService
	) {}

	requestScriptType() {
		return this.httpClient.get(
			`${environment.appApi}/script_type?accounting=${
				User.fromLocalStorage().organization.id
			}`,
			{
				headers: this.authService.getAuthorizationHeaders(),
			}
		);
	}

	requestAccountingVariables(scriptId: number) {
		return this.httpClient.get(
			`${environment.appApi}/variables/byOrganization?accountingId=${
				User.fromLocalStorage().organization.id
			}&scriptId=${scriptId}&page_size=100`,
			{ headers: this.authService.getAuthorizationHeaders() }
		);
	}

	deleteVariable(varId: number) {
		return this.httpClient.delete(
			`${environment.appApi}/variables/${varId}`,
			{ headers: this.authService.getAuthorizationHeaders() }
		);
	}

	requestCompanyVariables(companyId: number) {
		return this.httpClient.get(
			`${environment.appApi}/variables/organization/byCompany?companyId=${companyId}`,
			{ headers: this.authService.getAuthorizationHeaders() }
		);
	}

	requestMissingVariables(companyId: number) {
		return this.httpClient.get(
			`${environment.appApi}/variables/organization/missing?companyId=${companyId}`,
			{ headers: this.authService.getAuthorizationHeaders() }
		);
	}

	deleteCompanyVariable(varId: number) {
		return this.httpClient.delete(
			`${environment.appApi}/variables/organization/${varId}`,
			{ headers: this.authService.getAuthorizationHeaders() }
		);
	}

	postVariable(variableInfo: VariableInfo) {
		return this.httpClient.post(
			`${environment.appApi}/variables/organization`,
			variableInfo,
			{ headers: this.authService.getAuthorizationHeaders() }
		);
	}

	postAccountingVariable(variableInfo: AccountingVariableInfo) {
		return this.httpClient.post(
			`${environment.appApi}/variables`,
			variableInfo,
			{ headers: this.authService.getAuthorizationHeaders() }
		);
	}
}
