import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/authentication/authentication.service';

const BASE_URL = `${environment.appApi}/sectors`;

@Injectable({ providedIn: 'root' })
export class SectorService {

	constructor(private http: HttpClient, private authService: AuthenticationService) {}

	public get() {
		return this.http.get<{ label: string, value: number }[]>(BASE_URL, this._headers);
	}

	private get _headers() {
		const headers = this.authService.getAuthorizationHeaders();
		return { headers };
	}

}
