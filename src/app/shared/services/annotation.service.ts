import { UserService } from './../user/user.service';
import { AuthService } from './../auth/auth.service';
import { AppComponent } from './../../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AnnotationService {
	constructor(
		private http: HttpClient,
		private authService: AuthService,
		private userService: UserService
	) {}

	getAnnotations(externalId: string, kpiAlias: string) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + this.authService.token
		});

		return this.http.get(
			`${AppComponent.appApi}/annotations?organizationId=${externalId}&kpiAlias=${kpiAlias}`,
			{ headers }
		);
	}

	postAnnotation(externalId: string, kpiAlias: string, description: string) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + this.authService.token
		});
		console.log(this.userService.currentUserValue.username);

		return this.http.post(
			`${AppComponent.appApi}/annotations`,
			{
				organizationId: externalId,
				createdBy: this.userService.currentUserValue.username,
				kpiAlias,
				description
			},
			{ headers }
		);
	}

	deleteAnnotation(id: number) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + this.authService.token
		});

		return this.http.delete(`${AppComponent.appApi}/annotations/${id}`, {
			headers
		});
	}

	patchAnnotation(annotation: any) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + this.authService.token
		});

		return this.http
			.patch(
				`${AppComponent.appApi}/annotations/${annotation.id}`,
				annotation,
				{
					headers
				}
			)
			.pipe(debounceTime(10000));
	}
}
