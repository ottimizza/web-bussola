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

		return this.httpClient.post(
			`${AppComponent.storageUrl}/storage/${this.applicationId}/organization/ottimizza/store`,
			formData,
			{ headers: this.noAuthHeaders() }
		);
	}

	private noAuthHeaders = (): HttpHeaders =>
		new HttpHeaders({ Authorization: this.authService.token });
}
