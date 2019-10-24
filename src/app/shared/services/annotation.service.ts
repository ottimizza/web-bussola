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
		return this.http.get(
			`${AppComponent.appApi}/annotations?organizationId=${externalId}&kpiAlias=${kpiAlias}`,
			{ headers: this.authService.headers() }
		);
	}

	postAnnotation(externalId: string, kpiAlias: string, description: string) {
		return this.http.post(
			`${AppComponent.appApi}/annotations`,
			{
				organizationId: externalId,
				createdBy: this.userService.currentUserValue.username,
				kpiAlias,
				description
			},
			{ headers: this.authService.headers() }
		);
	}

	deleteAnnotation(id: number) {
		return this.http.delete(`${AppComponent.appApi}/annotations/${id}`, {
			headers: this.authService.headers()
		});
	}

	patchAnnotation(annotation: any) {
		return this.http
			.patch(
				`${AppComponent.appApi}/annotations/${annotation.id}`,
				annotation,
				{
					headers: this.authService.headers()
				}
			)
			.pipe(debounceTime(10000));
	}
}
