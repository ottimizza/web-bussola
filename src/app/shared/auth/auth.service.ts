import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { Jwt } from '../models/jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private currentJwtSubject: BehaviorSubject<Jwt>;
	public currentJwt: Observable<Jwt>;

	constructor(private http: HttpClient, private router: Router) {
		this.currentJwtSubject = new BehaviorSubject<Jwt>(
			JSON.parse(localStorage.getItem('jwt'))
		);
		this.currentJwt = this.currentJwtSubject.asObservable();
	}

	public headers = (): HttpHeaders => {
		return new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + this.token
		});
	};

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

	refreshAccessToken() {
		this.http
			.post(
				`${AppComponent.appApi}/oauth/refresh?refresh_token=${this.refreshToken}&client_id=${AppComponent.clientId}`,
				{}
			)
			.pipe(
				map((jwt: Jwt) => {
					localStorage.setItem('jwt', JSON.stringify(jwt));
					this.currentJwtSubject.next(jwt);
					return jwt;
				})
			)
			.pipe(first())
			.subscribe(
				(res: any) => {
					if (!res.error) {
						window.location.reload();
					} else {
						this.router.navigate(['login']);
					}
				},
				err => {
					console.log(err);
					this.router.navigate(['login']);
				}
			);
	}

	logout() {
		// remove user from local storage to log user out
		localStorage.clear();
		this.currentJwtSubject.next(null);
	}
}
