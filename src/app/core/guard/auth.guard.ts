import { NotificationService } from '@app/services/notification.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { AuthSession } from '@app/models/AuthSession';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
	constructor(
		public router: Router,
		public authenticationService: AuthenticationService,
		public notificationService: NotificationService
	) {}

	canActivate(): Promise<boolean> {
		const that = this;
		return new Promise<boolean>(async (resolve, reject) => {
			return that.authenticationService
				.isAuthenticated()
				.then((result: boolean) => {
					if (result) {
						Promise.all([
							this.authenticationService
								.storeUserInfo()
								.then(() => {
									// this.notificationService.requestSafariNotificationPermission();
								}),
							this.authenticationService.storeTokenInfo()
						]).then(() => {
							resolve(true);
						});
					} else {
						const authSession = AuthSession.fromLocalStorage();
						if (authSession.isEmpty()) {
							this.authenticationService.authorize();
						} else {
							return this.authenticationService
								.refresh(
									authSession.getAuthenticated().refreshToken
								)
								.pipe(finalize(() => resolve(true)))
								.subscribe(
									(response: any) => {
										if (response.access_token) {
											AuthSession.fromOAuthResponse(
												response
											)
												.store()
												.then(async () => {
													this.authenticationService.storeUserInfo();
													this.authenticationService.storeTokenInfo();
												});
										} else if (response.error) {
											this.authenticationService.authorize();
										}
									},
									() => {
										this.authenticationService
											.logout()
											.subscribe({
												complete: () => {
													this.authenticationService.clearStorage();
													this.authenticationService.authorize();
												}
											});
									}
								);
						}
					}
				});
		});
	}

	canActivateChild(): Promise<boolean> {
		return this.canActivate();
	}
}
