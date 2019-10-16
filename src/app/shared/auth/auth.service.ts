import { UserService } from './../user/user.service';
import { Jwt } from './../models/jwt';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';
const ACCESS_TOKEN_EXPIRATION_DATE_KEY = 'accessTokenExpirationDate';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private currentJwtSubject: BehaviorSubject<Jwt>;
	public currentJwt: Observable<Jwt>;

	constructor(
		private http: HttpClient,
		private router: Router
	) {
		this.currentJwtSubject = new BehaviorSubject<Jwt>(
			JSON.parse(localStorage.getItem('jwt'))
		);
		this.currentJwt = this.currentJwtSubject.asObservable();
	}

	public get currentJwtValue(): Jwt {
		return this.currentJwtSubject.value;
	}

	public get token(): string {
		return this.currentJwtSubject.value.access_token;
	}

	public get refreshToken(): string {
		return this.currentJwtSubject.value.refresh_token;
	}

	authenticate(code: string) {
		return this.http
			.post(
				`${AppComponent.appApi}/oauth/callback?code=${code}&redirect_uri=${AppComponent.loginUrl}?app=ottimizza`,
				{}
			)
			.pipe(
				map((jwt: Jwt) => {
					localStorage.setItem('jwt', JSON.stringify(jwt));
					this.currentJwtSubject.next(jwt);
					return jwt;
				})
			);
	}

	logout() {
		// remove user from local storage to log user out
		localStorage.clear();
		this.currentJwtSubject.next(null);
		window.location.reload();
	}

	refreshAccessToken() {
		return new Promise(resolve => {
			this.http
				.post(
					`${AppComponent.appApi}/oauth/refresh?refresh_token=${this.refreshToken}&client_id=${AppComponent.clientId}`,
					{}
				)
				.subscribe(
					(res: Jwt) => {
						resolve();
						this.setTokens(res.access_token, res.refresh_token);
						this.checkAndLogout();
					},
					err => {
						console.log(err);
						this.logout();
					}
				);
		});
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

	getRefreshToken(): string {
		return window.localStorage.getItem(REFRESH_KEY);
	}

	getAccessTokenExpirationDate(): string {
		return window.localStorage.getItem(ACCESS_TOKEN_EXPIRATION_DATE_KEY);
	}

	checkAndLogout() {
		if (!this.isAuthenticated()) {
			this.router.navigate(['/logout']);
		}
	}

	isAuthenticated(): boolean {
		return !!(
			this.token !== 'undefined' &&
			this.getRefreshToken() !== 'undefined' &&
			this.getAccessTokenExpirationDate() !== 'Invalid Date'
		);
	}
}
