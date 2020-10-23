import { MenuLayoutComponent } from './layout/menu/menu-layout.component';
import { MenuRoutes } from './layout/menu/menu-layout.routes';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/guard/auth.guard';
import { AuthLayoutComponent } from './layout/auth/auth-layout.component';

const routes: Routes = [
	{
		path: '',
		component: MenuLayoutComponent,
		data: { title: 'menu' },
		children: MenuRoutes,
		canActivate: [AuthGuard]
	},
	{
		path: 'auth/callback',
		component: AuthLayoutComponent,
		loadChildren: () =>
			import('@modules/auth/auth.module').then(m => m.AuthModule)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
