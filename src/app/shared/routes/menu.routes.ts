import { Routes } from '@angular/router';
export const MenuRoutes: Routes = [
	{
		path: 'indicadores',
		loadChildren: () => import('../../home/home.module').then(m => m.HomeModule)
	},
	{
		path: 'options',
		loadChildren: () =>
			import('../../options/options.module').then(m => m.OptionsModule)
	}
];
