import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
export const MenuRoutes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'indicadores'
	},
	{
		path: 'indicadores',
		loadChildren: () =>
			import('../../home/home.module').then(m => m.HomeModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'options',
		loadChildren: () =>
			import('../../options/options.module').then(m => m.OptionsModule),
		canActivate: [AuthGuard]
	}
];
