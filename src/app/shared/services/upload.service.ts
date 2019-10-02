import { AuthService } from './../auth/auth.service';
import { AppComponent } from './../../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UploadService {
	constructor(
		private httpClient: HttpClient,
		private authService: AuthService
	) {}

	uploadSingleFile(file: File) {
		const headers = new HttpHeaders({
			Authorization: 'Bearer ' + this.authService.getToken()
		});

		const formData = new FormData();
		formData.append('file', file);

		return this.httpClient.post(
			`${AppComponent.storageUrl}/storage/development-zap-contabil/accounting/${AppComponent.clientId}/store`,
			formData,
			{ headers }
		);
	}
}
