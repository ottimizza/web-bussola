import { AuthService } from './../auth/auth.service';
import { AppComponent } from './../../app.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BalanceService {
	constructor(
		private httpClient: HttpClient,
		private authService: AuthService
	) {}

	findBalance(cnpj: string, pageIndex: number, description: string) {
		return this.httpClient.get(
			`${AppComponent.appApi}/balance?page_index=${pageIndex}&page_size=10&description=${description}&cnpj=${cnpj}`,
			{
				headers: this.authService.headers()
			}
		);
	}
}
