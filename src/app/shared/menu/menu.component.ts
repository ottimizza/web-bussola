import { AppComponent } from './../../app.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

declare interface RouteInfo {
	path: string;
	title: string;
	icon: string;
	class: string;
}

export const ROUTES: RouteInfo[] = [
	{ path: '/home', title: 'Home', icon: 'fal fa-home', class: '' }
];

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
	menuItems: RouteInfo[];
	profileUrl: string;

	@ViewChild('drawer', { static: false }) drawer: ElementRef<MatSidenav>;

	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(map(result => result.matches));

	constructor(
		private breakpointObserver: BreakpointObserver,
		private router: Router
	) {}

	ngOnInit() {
		this.profileUrl = AppComponent.apiOauthService + '/profile';
		this.menuItems = ROUTES.filter(menuItem => menuItem);
	}
}
