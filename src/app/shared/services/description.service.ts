import { Description } from './../models/description';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DescriptionService {
	constructor(
		private httpClient: HttpClient,
		private authService: AuthenticationService
	) {}

	getDescription(organizationId: string, cnpj: string, kpiAlias: string) {
		return this.httpClient.get(`${environment.appApi}/description`, {
			headers: this.authService.getAuthorizationHeaders(),
			params: { organizationId, cnpj, kpiAlias }
		});
	}

	patchDescription(description: Description) {
		return this.httpClient.patch(
			`${environment.appApi}/description/${description.id}`,
			{ description: description.description },
			{
				headers: this.authService.getAuthorizationHeaders()
			}
		);
	}
}
