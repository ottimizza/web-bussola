import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { GenericPageableResponse } from 'src/app/shared/models/GenericPageableResponse';
import { User } from 'firebase';
import { environment } from 'src/environments/environment';
import { GenericResponse } from 'src/app/shared/models/GenericResponse';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	constructor(
		private http: HttpClient,
		private authorizationService: AuthenticationService
	) {}

	public fetch(
		searchCriteria: any
	): Observable<GenericPageableResponse<User>> {
		const params = this.encode(searchCriteria);
		const url = `${environment.oauthBaseUrl}/api/v1/users?${params}`;
		const headers = this.authorizationService.getAuthorizationHeaders();
		return this.http.get<GenericPageableResponse<User>>(url, { headers });
	}

	public fetchById(id: number): Observable<GenericResponse<User>> {
		const url = `${environment.oauthBaseUrl}/api/v1/users/${id}`;
		const headers = this.authorizationService.getAuthorizationHeaders();
		return this.http.get<GenericResponse<User>>(url, { headers });
	}

	public patch(id: number, data: any): Observable<GenericResponse<User>> {
		const url = `${environment.oauthBaseUrl}/api/v1/users/${id}`;
		const headers = this.authorizationService.getAuthorizationHeaders();
		return this.http.patch<GenericResponse<User>>(url, data, { headers });
	}

	encode(params: any): string {
		return Object.keys(params)
			.map(key => {
				return [key, params[key]].map(encodeURIComponent).join('=');
			})
			.join('&');
	}
}
