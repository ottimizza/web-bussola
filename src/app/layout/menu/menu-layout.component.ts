import { AuthenticationService } from './../../core/authentication/authentication.service';
import { User } from '@shared/models/User';
import { environment } from '@env';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AppComponent } from 'app/app.component';

export const ROUTES: RouteInfo[] = [
	// {
	// 	path: '/home',
	// 	title: 'Início',
	// 	icon: 'fal fa-home',
	// 	class: '',
	// 	permissonLevelNeeded: 2
	// },
	{
		path: '/comparatives',
		title: 'Comparativos',
		icon: 'fal fa-chart-line',
		class: '',
		permissonLevelNeeded: 2
	},
	{
		path: '/pointers',
		title: 'Indicadores',
		icon: 'fal fa-analytics',
		class: '',
		permissonLevelNeeded: 2
	},
	// {
	// 	path: '/options/organization',
	// 	title: 'Parâmetros da contabilidade',
	// 	icon: 'fal fa-th-list',
	// 	class: '',
	// 	permissonLevelNeeded: 1
	// },
	// {
	// 	path: '/options/company',
	// 	title: 'Parâmetros dos clientes',
	// 	icon: 'fal fa-th-list',
	// 	class: '',
	// 	permissonLevelNeeded: 1
	// }
];

@Component({
	selector: 'app-menu-layout',
	templateUrl: './menu-layout.component.html',
	styleUrls: ['./menu-layout.component.scss']
})
export class MenuLayoutComponent implements OnInit {
	menuItems: RouteInfo[];
	profileUrl: string;
	avatarUrl?: string;
	organizationLogoUrl?: string;
	userPermissionLevel: number;

	@ViewChild('drawer', { static: false }) drawer: ElementRef<MatSidenav>;

	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(map(result => result.matches));

	constructor(
		private breakpointObserver: BreakpointObserver,
		private authenticationService: AuthenticationService
	) {}

	ngOnInit() {
		this.avatarUrl = User.fromLocalStorage().avatar;
		this.organizationLogoUrl = User.fromLocalStorage().organization.avatar;
		this.userPermissionLevel = User.fromLocalStorage().type;
		this.profileUrl =
			environment.oauthBaseUrl +
			'/usuarios/' +
			User.fromLocalStorage().id;
		this.menuItems = ROUTES.filter(menuItem => menuItem);
	}

	logout() {
		this.authenticationService.logout().subscribe(() => {
			this.authenticationService.clearStorage();
			this.authenticationService.authorize();
		});
	}
}

export interface RouteInfo {
	path: string;
	title: string;
	icon: string;
	class: string;
	permissonLevelNeeded: number;
}
