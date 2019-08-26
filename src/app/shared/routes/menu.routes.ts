import { Routes } from '@angular/router';
export const MenuRoutes: Routes = [
	{
		path: 'home',
		loadChildren: () => import('../../home/home.module').then(m => m.HomeModule)
	}
];
