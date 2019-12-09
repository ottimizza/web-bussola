import { User } from '@shared/models/User';
import { AuthenticationService } from '@app//authentication/authentication.service';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AnnotationService {
	constructor(
		private http: HttpClient,
		private authService: AuthenticationService
	) {}

	getAnnotations(organizationId: string, kpiAlias: string) {
		return this.http.get(
			`${environment.appApi}/annotations?organizationId=${organizationId}&kpiAlias=${kpiAlias}`,
			{ headers: this.authService.getAuthorizationHeaders() }
		);
	}

	postAnnotation(
		organizationId: string,
		kpiAlias: string,
		description: string
	) {
		return this.http.post(
			`${environment.appApi}/annotations`,
			{
				organizationId,
				createdBy: User.fromLocalStorage().username, // PODERIA SER ID AO INVÉS DE USERNAME
				kpiAlias,
				description
			},
			{ headers: this.authService.getAuthorizationHeaders() }
		);
	}

	deleteAnnotation(id: number) {
		return this.http.delete(`${environment.appApi}/annotations/${id}`, {
			headers: this.authService.getAuthorizationHeaders()
		});
	}

	patchAnnotation(annotation: any) {
		return this.http
			.patch(
				`${environment.appApi}/annotations/${annotation.id}`,
				annotation,
				{
					headers: this.authService.getAuthorizationHeaders()
				}
			)
			.pipe(debounceTime(10000));
	}
}
