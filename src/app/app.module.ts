import * as $ from 'jquery';

import {
	MatButtonModule,
	MatIconModule,
	MatListModule,
	MatSidenavModule,
	MatToolbarModule,
	MatSnackBarModule
} from '@angular/material';
import { MenuLayoutComponent } from './layout/menu/menu-layout.component';
import { AuthLayoutComponent } from './layout/auth/auth-layout.component';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleChartsModule } from 'angular-google-charts';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { AsyncPipe } from '@angular/common';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { AuthGuard } from './core/guard/auth.guard';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';

// const appInitializerFn = (appConfig: ConfigService) => {
// 	return () => {
// 		return appConfig.setDefautlVariables();
// 	};
// };

@NgModule({
	declarations: [AppComponent, MenuLayoutComponent, AuthLayoutComponent],
	imports: [
		AppRoutingModule,
		SharedModule,
		BrowserModule,
		BrowserAnimationsModule,
		AngularFireMessagingModule,
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
		MatSnackBarModule,
		GoogleChartsModule.forRoot(),
		NgxLinkifyjsModule.forRoot(),
		DeviceDetectorModule.forRoot(),
		AngularFireModule.initializeApp(environment.firebase),
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production
		})
	],
	providers: [AsyncPipe, AuthGuard],
	bootstrap: [AppComponent]
})
export class AppModule {}
