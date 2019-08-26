import { LogoutComponent } from './shared/auth/logout.component';
import { MenuRoutes } from './shared/routes/menu.routes';
import { MenuComponent } from './shared/menu/menu.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { LoginComponent } from './shared/auth/login.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'home'
	},
	{
		path: '',
		component: MenuComponent,
		data: { title: 'menu' },
		children: MenuRoutes,
		canActivate: [AuthGuard]
	},
	{
		path: 'login',
		component: LoginComponent,
		data: { title: 'login' }
	},
	{
		path: 'logout',
		component: LogoutComponent,
		data: { title: 'logout' }
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
