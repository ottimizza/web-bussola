import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';

@Injectable({ providedIn: 'root' })
export class CompanyService {
	constructor(private http: HttpClient, private authService: AuthService) {}

	getCompanies() {
		return this.http.get(
			`${AppComponent.apiOauthService}/api/v1/organizations?page_size=10&page_index=0`,
			{ headers: this.authService.headers() }
		);
	}
}
