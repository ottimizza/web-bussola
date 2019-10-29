import { SelectCompanyComponent } from './select-company/select-company.component';
import { LogoutComponent } from './auth/logout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './auth/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatSidenavModule,
	MatListModule,
	MatButtonModule,
	MatIconModule,
	MatToolbarModule,
	MatSnackBarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './helpers/http-error.interceptor';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		LoginComponent,
		LogoutComponent,
		MenuComponent,
		SelectCompanyComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		DropdownModule,
		LayoutModule,
		MatButtonModule,
		MatIconModule,
		MatListModule,
		MatSidenavModule,
		MatToolbarModule,
		HttpClientModule,
		MatSnackBarModule
	],
	exports: [MenuComponent, SelectCompanyComponent],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
	]
})
export class SharedModule {}
