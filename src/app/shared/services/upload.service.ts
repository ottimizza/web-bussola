import { AuthService } from './../auth/auth.service';
import { AppComponent } from './../../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UploadService {
	private applicationId = `development-bussola-contabil`;

	constructor(
		private httpClient: HttpClient,
		private authService: AuthService
	) {}

	uploadSingleFile(file: File) {
		const formData = new FormData();
		formData.append('file', file);

		const headers = { headers: this.noAuthHeaders() };

		return this.httpClient.post(
			`${AppComponent.storageUrl}/storage/${this.applicationId}/accounting/ottimizza/store`,
			formData,
			headers
		);
	}

	private noAuthHeaders = (): HttpHeaders =>
		new HttpHeaders({ Authorization: this.authService.token });
}
