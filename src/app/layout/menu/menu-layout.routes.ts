import { AuthGuard } from './../../core/guard/auth.guard';
import { Routes } from '@angular/router';
export const MenuRoutes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'home'
	},
	{
		path: 'home',
		loadChildren: () =>
			import('../../modules/home/home.module').then(m => m.HomeModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'indicadores',
		loadChildren: () =>
			import('../../modules/pointers/pointers.module').then(
				m => m.PointersModule
			),
		canActivate: [AuthGuard]
	},
	{
		path: 'options',
		loadChildren: () =>
			import('../../modules/options/options.module').then(
				m => m.OptionsModule
			),
		canActivate: [AuthGuard]
	}
];
