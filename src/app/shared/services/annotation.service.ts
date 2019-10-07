import { AuthService } from './../auth/auth.service';
import { AppComponent } from './../../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AnnotationService {
	constructor(private http: HttpClient, private authService: AuthService) {}

	getAnnotations(externalId: string, kpiAlias: string) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + this.authService.getToken()
		});

		return this.http.get(
			`${AppComponent.appApi}/annotations?organizationId=${externalId}&kpiAlias=${kpiAlias}`,
			{ headers }
		);
	}

	postAnnotation(externalId: string, kpiAlias: string, description: string) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + this.authService.getToken()
		});

		return this.http.post(
			`${AppComponent.appApi}/annotations`,
			{
				organizationId: externalId,
				createAt: new Date(),
				createdBy: this.authService.getUsername(),
				kpiAlias,
				description
			},
			{ headers }
		);
	}

	deleteAnnotation(id: number) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + this.authService.getToken()
		});

		return this.http.delete(`${AppComponent.appApi}/annotations/${id}`, {
			headers
		});
	}
}
