import { AuthGuard } from '@app/guard/auth.guard';
import { Routes } from '@angular/router';
export const MenuRoutes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'pointers'
	},
	// {
	// 	path: 'home',
	// 	loadChildren: () =>
	// 		import('@modules/home/home.module').then(m => m.HomeModule),
	// 	canActivate: [AuthGuard]
	// },
	{
		path: 'pointers',
		loadChildren: () =>
			import('@modules/pointers/pointers.module').then(
				m => m.PointersModule
			),
		canActivate: [AuthGuard]
	},
	{
		path: 'comparatives',
		loadChildren: () =>
			import('@modules/comparatives/comparatives.module').then(
				m => m.ComparativesModule
			),
		canActivate: [AuthGuard]
	},
	{
		path: 'options',
		loadChildren: () =>
			import('@modules/options/options.module').then(
				m => m.OptionsModule
			),
		canActivate: [AuthGuard]
	}
	// {
	// 	path: 'settings',
	// 	loadChildren: () =>
	// 		import('@modules/settings/settings.module').then(
	// 			m => m.SettingsModule
	// 		),
	// 	canActivate: [AuthGuard]
	// }
];
