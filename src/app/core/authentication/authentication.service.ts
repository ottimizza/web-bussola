import { Router } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

import { StorageService } from '@shared/services/storage.service';
import { AuthSession } from '@app/models/AuthSession';
import { environment } from '@env';
import { User } from '@app/models/User';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService {
	static REFRESH_URL = '/auth/refresh';

	static STORAGE_KEY_USERINFO = 'user-info';
	static STORAGE_KEY_TOKENINFO = 'token-info';
	static STORAGE_KEY_AUTHSESSION = 'auth-session';

	public redirectURI = `${window.location.origin}/auth/callback`;

	constructor(
		@Inject(DOCUMENT) private document: Document,
		public storageService: StorageService,
		private http: HttpClient,
		private router: Router
	) {}

	public store(authSession: AuthSession): Promise<{}> {
		return new Promise<boolean>((resolve) => {
			localStorage.setItem(
				AuthenticationService.STORAGE_KEY_USERINFO,
				authSession.toString()
			);
			resolve();
		});
	}

	public destroy(): Promise<{}> {
		return new Promise<boolean>((resolve, reject) => {
			localStorage.removeItemsetItem(
				AuthenticationService.STORAGE_KEY_USERINFO
			);
			resolve();
		});
	}

	public isAuthenticated(): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			const authSession: AuthSession = AuthSession.fromLocalStorage();
			if (authSession !== null && typeof authSession !== 'undefined') {
				resolve(!authSession.isExpired());
			} else {
				resolve(false);
			}
		});
	}

	public async storeUserInfo(): Promise<void> {
		const headers = this.getAuthorizationHeaders();
		return new Promise<void>((resolve, reject) => {
			return this.http
				.get(`${environment.oauthBaseUrl}/oauth/userinfo`, { headers })
				.pipe(
					finalize(() => {
						resolve();
					})
				)
				.subscribe((response: any) => {
					this.storageService.store(
						AuthenticationService.STORAGE_KEY_USERINFO,
						JSON.stringify(response.record)
					);
				});
		}).then(() => {});
	}

	public async storeTokenInfo(): Promise<void> {
		const headers = this.getAuthorizationHeaders();
		return new Promise<void>((resolve, reject) => {
			return this.http
				.get(`${environment.oauthBaseUrl}/oauth/tokeninfo`, { headers })
				.pipe(
					finalize(() => {
						resolve();
					})
				)
				.subscribe(
					(response: any) => {
						this.storageService.store(
							AuthenticationService.STORAGE_KEY_TOKENINFO,
							JSON.stringify(response)
						);
					},
					(err) => {
						if (err.status === 403) {
							alert(
								'Seu usuário não possue acesso a esta aplicação. Se você acha que isso está errado, fale com seu administrador.'
							);
							this.router.navigate(['auth', 'logout']);
						}
					}
				);
		}).then(() => {});
	}

	public clearStorage() {
		localStorage.removeItem(AuthenticationService.STORAGE_KEY_USERINFO);
		localStorage.removeItem(AuthenticationService.STORAGE_KEY_TOKENINFO);
		localStorage.removeItem(AuthenticationService.STORAGE_KEY_AUTHSESSION);
	}

	public authorize(responseType: string = 'code'): void {
		const that = this;
		const baseUrl = `${environment.oauthBaseUrl}/oauth/authorize`;
		const clientId = `${environment.oauthClientId}`;
		const logoUrl = `${window.location.origin}/assets/img/logo-white.png`;
		const url = `${baseUrl}?response_type=${responseType}&prompt=login&client_id=${clientId}&redirect_uri=${this.redirectURI}&logo=${logoUrl}`;
		this.document.location.href = url;
	}

	public exchange(code: string) {
		const url = `${environment.appApi}/oauth/callback?code=${code}&redirect_uri=${this.redirectURI}`;
		return this.http.post(url, {}, {});
	}

	public refresh(refreshToken: string) {
		const clientId = `${environment.appApi}`;
		const url = `${environment.appApi}/oauth/refresh?refresh_token=${refreshToken}&client_id=${clientId}`;
		return this.http.post(url, {}, {});
	}

	public logout() {
		const url = `${environment.oauthBaseUrl}/oauth/revoke_token`;
		const headers = this.getAuthorizationHeaders();
		return this.http.delete(url, { headers });
	}

	public getAuthorizationHeaders(): HttpHeaders {
		return new HttpHeaders().set(
			'Authorization',
			`Bearer ${this.getAccessToken().trim()}`
		);
	}

	public getAccessToken(): string {
		return this.getAuthSession().authenticated.accessToken || null;
	}

	public getAuthSession(): AuthSession {
		const authSession = localStorage.getItem('auth-session') || null;
		if (authSession) {
			return JSON.parse(authSession);
		}
		return null;
	}

	public getUserInfo(): User {
		return JSON.parse(
			localStorage.getItem(AuthenticationService.STORAGE_KEY_USERINFO)
		);
	}

	genState() {
		let state = '';
		const possible =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < 16; i++) {
			state += possible.charAt(
				Math.floor(Math.random() * possible.length)
			);
		}
		return state;
	}
}
