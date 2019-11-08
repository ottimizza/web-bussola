import { AuthService } from './../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { map } from 'rxjs/operators';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class UserService {
	private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;

	constructor(private authService: AuthService, private http: HttpClient) {
		this.currentUserSubject = new BehaviorSubject<User>(
			JSON.parse(localStorage.getItem('user'))
		);
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue(): User {
		return this.currentUserSubject.value;
	}

	getUserInfo() {
		return this.http
			.get(`${AppComponent.apiOauthService}/oauth/userinfo`, {
				headers: this.authService.headers()
			})
			.pipe(
				map((user: { record: User }) => {
					localStorage.setItem('user', JSON.stringify(user.record));
					this.currentUserSubject.next(user.record);
					return user;
				})
			);
	}
}
