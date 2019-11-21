import { environment } from '@env';
import { AuthenticationService } from '@app//authentication/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UploadService {
	constructor(
		private httpClient: HttpClient,
		private authService: AuthenticationService
	) {}

	uploadSingleFile(file: File) {
		const formData = new FormData();
		formData.append('file', file);

		return this.httpClient.post(
			`${environment.storageUrl}/storage/${environment.applicationId}/organization/ottimizza/store`,
			formData,
			{ headers: this.noAuthHeaders() }
		);
	}

	private noAuthHeaders = (): HttpHeaders =>
		new HttpHeaders({ Authorization: this.authService.getAccessToken() });
}
