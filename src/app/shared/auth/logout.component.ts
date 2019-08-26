import { AppComponent } from './../../app.component';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-logout',
	template: ''
})
export class LogoutComponent implements OnInit {
	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {
		new Promise((resolve, reject) => {
			const img = new Image();
			img.addEventListener('load', e => resolve(img));
			img.addEventListener('error', () => reject());
			img.src = `${AppComponent.apiOauthService}/logout`;
		}).catch(() => {
			this.authService.logout();
			this.router.navigate(['login']);
		});
	}
}
