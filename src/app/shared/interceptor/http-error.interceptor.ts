import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { retry, catchError, retryWhen, tap, delayWhen } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

export class HttpErrorInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			// retry(2),
			retryWhen(err =>
				err.pipe(
					delayWhen(() => timer(250)),
					tap(() => {
						console.log('retrying...');
						this.authService.refreshTokenOnly();
					})
				)
			)
			// catchError((error: HttpErrorResponse) => {
			// 	this.authService.refreshTokenOnly();
			// 	let errorMessage = '';
			// 	if (error.error instanceof ErrorEvent) {
			// 		// client-side error
			// 		errorMessage = `Error: ${error.error.message}`;
			// 	} else {
			// 		// server-side error
			// 		errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
			// 	}
			// 	return throwError(errorMessage);
			// })
		);
	}
}
