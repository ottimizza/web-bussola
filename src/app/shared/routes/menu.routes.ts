import { Routes } from '@angular/router';
export const MenuRoutes: Routes = [
	{
		path: 'indicadores',
		loadChildren: () => import('../../home/home.module').then(m => m.HomeModule)
	},
	{
		path: 'variables',
		loadChildren: () =>
			import('../../variables/variables.module').then(m => m.VariablesModule)
	}
];
