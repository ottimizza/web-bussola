import { User } from './models';
import { Router } from '@angular/router';
import { TokenObj } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';
const ACCESS_TOKEN_EXPIRATION_DATE_KEY = 'accessTokenExpirationDate';

@Injectable({ providedIn: 'root' })
export class AuthService {
	constructor(private http: HttpClient, private router: Router) {}

	authenticate(code: string) {
		this.http
			.post(
				`${AppComponent.appApi}/oauth/callback?code=${code}&redirect_uri=${AppComponent.loginUrl}?app=ottimizza`,
				{}
			)
			.subscribe((res: TokenObj) => {
				this.setTokenExpirationDate(res.expires_in);
				this.setTokens(res.access_token, res.refresh_token);
				this.requestUsernameInfo();
			});
	}

	// SE A DATA ATUAL JÁ PASSOU DA DATA QUE O TOKEN IRIA EXPIRAR A FUNCTION CHAMA O refreshToken
	checkTokenExpired(callback: () => any) {
		this.checkAndLogout();

		if (
			new Date().getTime() > new Date(this.getTokenExpirationDate()).getTime()
		) {
			this.refreshToken(callback);
		} else {
			callback();
		}
	}

	refreshToken(callback: () => any) {
		this.http
			.post(
				`${
					AppComponent.appApi
				}/oauth/refresh?refresh_token=${this.getRefreshToken()}&client_id=${
					AppComponent.clientId
				}`,
				{}
			)
			.subscribe(
				(res: TokenObj) => {
					this.setTokenExpirationDate(res.expires_in);
					this.setTokens(res.access_token, res.refresh_token);
					this.checkAndLogout();
				},
				err => {
					console.log(err);
					this.checkAndLogout();
				},
				() => callback()
			);
	}

	requestUsernameInfo() {
		const headers = new HttpHeaders().set(
			'Authorization',
			'Bearer ' + this.getToken()
		);

		this.http
			.get(`${AppComponent.apiOauthService}/user/info`, {
				headers
			})
			.subscribe((user: User) => {
				this.setUsername(user.principal.username);
				this.router.navigate(['']);
			});
	}

	logout() {
		this.clearStorage();
	}

	clearStorage() {
		window.localStorage.clear();
	}

	setTokenExpirationDate(s: number) {
		const d = new Date();
		d.setSeconds(d.getSeconds() + s - 30);
		window.localStorage.setItem(ACCESS_TOKEN_EXPIRATION_DATE_KEY, d.toString());
	}

	getTokenExpirationDate(): Date {
		return new Date(
			window.localStorage.getItem(ACCESS_TOKEN_EXPIRATION_DATE_KEY)
		);
	}

	setTokens(token: string, refreshToken: string) {
		this.setToken(token);
		this.setRefreshToken(refreshToken);
	}

	setToken(token: string) {
		window.localStorage.setItem(ACCESS_KEY, token);
	}

	setRefreshToken(refreshToken: string) {
		window.localStorage.setItem(REFRESH_KEY, refreshToken);
	}

	setUsername(username: string) {
		window.localStorage.setItem('username', username);
	}

	getToken(): string {
		return window.localStorage.getItem(ACCESS_KEY);
	}

	getRefreshToken(): string {
		return window.localStorage.getItem(REFRESH_KEY);
	}

	getAccessTokenExpirationDate(): string {
		return window.localStorage.getItem(ACCESS_TOKEN_EXPIRATION_DATE_KEY);
	}

	getUsername(): string {
		return window.localStorage.getItem('username');
	}

	removeTokens() {
		this.removeToken();
		this.removeRefreshToken();
	}

	removeToken() {
		window.localStorage.removeItem(ACCESS_KEY);
	}

	removeRefreshToken() {
		window.localStorage.removeItem(REFRESH_KEY);
	}

	checkAndLogout() {
		if (!this.isAuthenticated()) {
			this.router.navigate(['/logout']);
		}
	}

	isAuthenticated(): boolean {
		return !!(
			this.getToken() !== 'undefined' &&
			this.getRefreshToken() !== 'undefined' &&
			this.getAccessTokenExpirationDate() !== 'Invalid Date' &&
			this.getUsername() !== 'undefined'
		);
	}
}

export interface TokenObj {
	access_token: string;
	token_type: string;
	refresh_token: string;
	expires_in: number;
	scope: string;
}
