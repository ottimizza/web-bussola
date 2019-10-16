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
		const currentUser = this.authService.currentJwtValue;
		if (currentUser) {
			this.userService
				.getUserInfo()
				.pipe(first())
				.subscribe(res => console.log(res), err => console.log(err));
			return true;
		}
		this.router.navigate(['/login']);
		this.userService
			.getUserInfo()
			.pipe(first())
			.subscribe(res => console.log(res), err => console.log(err));
		return false;
	}
}
