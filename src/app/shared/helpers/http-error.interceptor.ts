import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { ToastService } from '../services/toast.service';

export class HttpErrorInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService, private toast: ToastService) {}

	intercept(
		request: HttpRequest<any>,

		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error.status === 401) {
					this.toast.show('Re-autenticando...', 'primary');
					setTimeout(() => {
						this.authService.refreshAccessToken();
					}, 100);
				}
				let errorMessage = '';
				if (error.error instanceof ErrorEvent) {
					// client-side error
					errorMessage = `Error: ${error.error.message}`;
				} else {
					// server-side error
					errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
				}

				console.log(error);

				return throwError(errorMessage);
			})
		);
	}
}
