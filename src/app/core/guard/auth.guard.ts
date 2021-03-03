import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild, ActivatedRoute, Route } from '@angular/router';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { Subject } from 'rxjs';
import { switchMap, finalize } from 'rxjs/operators';
import { StorageService } from '@app/services/storage.service';
import { AuthSession } from '@app/models/AuthSession';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {

	private redirectTo: string;

	constructor(
		public router: Router,
		private activatedRoute: ActivatedRoute,
		public storageService: StorageService,
		public authenticationService: AuthenticationService
	) { }

	async canActivate(): Promise<boolean> {
		const that = this;

		this.redirectTo = window.location.pathname;
		await AuthSession.configurateFromUrl();

		return new Promise<boolean>(async (resolve, reject) => {
			return that.authenticationService.isAuthenticated().then((result: boolean) => {
				if (result) {
					Promise.all([
						this.authenticationService.storeUserInfo(),
						this.authenticationService.storeTokenInfo()
					]).then(() => {
						resolve(true);
					});
				} else {
					const authSession = AuthSession.fromLocalStorage();
					if (authSession.isEmpty()) {
						this.authorize();
					} else {
						return this.authenticationService.refresh(authSession.getAuthenticated().refreshToken)
							.pipe(
								finalize(() => resolve(true))
							).subscribe((response: any) => {
								if (response.access_token) {
									AuthSession.fromOAuthResponse(response).store().then(async () => {
										this.authenticationService.storeUserInfo();
										this.authenticationService.storeTokenInfo();
									});
								} else if (response.error) {
									this.authorize();
								}
							});
					}
				}
			});
		});
	}

	canActivateChild(): Promise<boolean> {
		return this.canActivate();
	}

	public authorize() {
		this.storageService.store(`redirect_url`, this.redirectTo)
			.then((e) => {
				this.authenticationService.authorize();
			});
	}

}
