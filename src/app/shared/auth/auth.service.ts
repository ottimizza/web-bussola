import { Router } from '@angular/router';
import { TokenObj } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models';
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
				this.requestUserInfo();
			});
	}

	// SE A DATA ATUAL JÁ PASSOU DA DATA QUE O TOKEN IRIA EXPIRAR A FUNCTION CHAMA O refreshToken
	checkTokenExpired(callback: () => any) {
		console.log('token' + this.getRefreshToken());

		if (this.getRefreshToken() === undefined) {
			console.log('deveria ter navegado');
			this.router.navigate(['/logout']);
		}

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
				},
				err => console.log(err),
				() => callback()
			);
	}

	requestUserInfo() {
		const headers = new HttpHeaders().set(
			'Authorization',
			'Bearer ' + this.getToken()
		);

		this.http
			.get(`${AppComponent.apiOauthService}/user/info`, {
				headers
			})
			.subscribe((user: User) => {
				this.setEmail(user.principal.username);
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

	getTokenExpirationDate() {
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

	setEmail(email: string) {
		window.localStorage.setItem('email', email);
	}

	getToken() {
		return window.localStorage.getItem(ACCESS_KEY);
	}

	getRefreshToken() {
		return window.localStorage.getItem(REFRESH_KEY);
	}

	getEmail() {
		return window.localStorage.getItem('email');
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

	hasToken() {
		return (
			window.localStorage.getItem(ACCESS_KEY) &&
			window.localStorage.getItem(REFRESH_KEY) &&
			window.localStorage.getItem('email')
		);
	}

	isAuthenticated() {
		return !!this.hasToken();
	}
}

export interface TokenObj {
	access_token: string;
	token_type: string;
	refresh_token: string;
	expires_in: number;
	scope: string;
}
