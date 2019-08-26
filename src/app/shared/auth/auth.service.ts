import { Router } from '@angular/router';
import { TokenObj } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models';
import { AppComponent } from 'src/app/app.component';

const KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

@Injectable({ providedIn: 'root' })
export class AuthService {
	constructor(private http: HttpClient, private router: Router) {}

	authenticate(code: string) {
		this.http
			.post(
				`${
					AppComponent.appApi
				}/oauth/callback?code=${code}&redirect_uri=${
					AppComponent.loginUrl
				}?app=ottimizza`,
				{}
			)
			.subscribe((res: TokenObj) => {
				this.setTokens(res.access_token, res.refresh_token);
				this.requestUserInfo();
			});
	}

	refreshToken() {
		const headers = new HttpHeaders({
			Authorization:
				'Basic ' + btoa('bussola-contabil-client:bussola-contabil-secret')
		});

		return this.http.post(
			`${
				AppComponent.apiOauthService
			}/oauth/token?grant_type=refresh_token&refresh_token=${this.getRefreshToken()}`,
			{},
			{ headers }
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

	setTokens(token: string, refreshToken: string) {
		this.setToken(token);
		this.setRefreshToken(refreshToken);
	}

	setToken(token: string) {
		window.localStorage.setItem(KEY, token);
	}

	setRefreshToken(refreshToken: string) {
		window.localStorage.setItem(REFRESH_KEY, refreshToken);
	}

	setEmail(email: string) {
		window.localStorage.setItem('email', email);
	}

	getToken() {
		return window.localStorage.getItem(KEY);
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
		window.localStorage.removeItem(KEY);
	}

	removeRefreshToken() {
		window.localStorage.removeItem(REFRESH_KEY);
	}

	hasToken() {
		return (
			window.localStorage.getItem(KEY) &&
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
	expires_in: string;
	scope: string;
}
