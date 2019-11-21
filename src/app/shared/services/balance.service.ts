import { AuthenticationService } from '@app//authentication/authentication.service';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BalanceService {
	constructor(
		private httpClient: HttpClient,
		private authService: AuthenticationService
	) {}

	findBalance(cnpj: string, pageIndex: number, description: string) {
		return this.httpClient.get(
			`${environment.appApi}/balance?page_index=${pageIndex}&page_size=10&description=${description}&cnpj=${cnpj}`,
			{
				headers: this.authService.getAuthorizationHeaders()
			}
		);
	}
}
