import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router
} from '@angular/router';
import { first } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private authService: AuthService,
		private userService: UserService,
		private router: Router
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		this.userService;
		if (!this.authService.currentJwtValue) {
			this.router.navigate(['/login']);
			return false;
		}
		this.userService
			.getUserInfo()
			.pipe(first())
			.subscribe(() => {}, err => console.log(err));

		return true;
	}
}
