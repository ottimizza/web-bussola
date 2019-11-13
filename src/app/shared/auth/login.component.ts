import { UserService } from './../user/user.service';
import { AppComponent } from '../../app.component';
import { AuthService } from './auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-login',
	template: ''
})
export class LoginComponent implements OnInit {
	returnUrl: string;
	localhost = false;

	ottimizzaAuthServerDetails = {
		url: this.localhost
			? 'http://localhost:9092'
			: AppComponent.apiOauthService, // oauth/authorize
		clientId: AppComponent.clientId,
		redirectUri: `${window.location}?app=ottimizza`
	};

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private route: ActivatedRoute,
		private authService: AuthService,
		private router: Router,
		private userService: UserService
	) {}

	ottimizza(responseType: string): void {
		const that = this;

		const baseUrl = `${that.ottimizzaAuthServerDetails.url}/oauth/authorize`;
		const clientId = `${that.ottimizzaAuthServerDetails.clientId}`;
		const redirectUri = `${that.ottimizzaAuthServerDetails.redirectUri}`;
		const logoUrl = `${window.location.origin}/assets/img/logo-white.png`;
		const state = that.genState();

		that.writeCookieState(state, true).then(() => {
			const url = `${baseUrl}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&logo=${logoUrl}`;
			this.document.location.href = url;
		});
	}

	login(responseType: string = 'code') {
		this.ottimizza(responseType);
	}

	private writeCookieState(state: string, googleAuth: boolean): Promise<{}> {
		return new Promise(resolve => {
			// Note here the specific domain beginning with a point
			// That’s one of the key in order to be able to read the cookie from the subdomain
			const baseDomain = '.ottimizza.com';
			const expireAfter: Date = new Date(); // moment(new Date()).add(5, 'm').toDate();
			expireAfter.setMonth(expireAfter.getMonth() + 5);

			const ostate = { state, googleAuth };

			const cookie = `Our_state=${JSON.stringify(
				ostate
			)}; expires="${expireAfter}"; domain="${baseDomain}"; path="/"`;

			this.document.cookie = cookie;
			// 'Our_state={"state":"' + state + '", "googleAuth": ' + googleAuth + '};
			// expires=' + expireAfter + '; domain=' + baseDomain + '; path=/’;

			resolve();
		});
	}

	genState() {
		let state = '';
		const possible =
			'GV9Jm2u7rmsCe65wKzPTw5jtS38n2tVEGiijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < 16; i++) {
			state += possible.charAt(
				Math.floor(Math.random() * possible.length)
			);
		}
		return state;
	}

	ngOnInit() {
		this.route.queryParamMap.subscribe(queryParams => {
			if (!!queryParams.get('code')) {
				this.authService
					.authenticate(queryParams.get('code'))
					.pipe(first())
					.subscribe(
						data => {
							this.userService
								.getUserInfo()
								.pipe(first())
								.subscribe(
									() => this.router.navigateByUrl(''),
									err => console.log(err)
								);
						},
						err => console.log(err)
					);
			} else {
				this.login();
			}
		});
	}
}
