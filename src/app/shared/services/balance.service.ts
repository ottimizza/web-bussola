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

	findBalance(cnpj: string) {
		return this.httpClient.get(`${AppComponent.appApi}/balance?cnpj=${cnpj}`, {
			headers: this.authService.headers()
		});
	}
}
