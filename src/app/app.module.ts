import { MaterialModule } from './material.module';
import { CoreModule } from '@app/core.module';
import {
	MenuLayoutComponent,
	ShareDialogComponent
} from './layout/menu/menu-layout.component';
import { AuthLayoutComponent } from './layout/auth/auth-layout.component';
import { SharedModule } from '@shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleChartsModule } from 'angular-google-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@env';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AsyncPipe } from '@angular/common';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { LayoutModule } from '@angular/cdk/layout';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import { ErrorInterceptorProvider } from '@app/interceptor/http.interceptor';

import * as $ from 'jquery';
import { SigninAsDialogComponent } from '@shared/components/dialogs/signin-as-dialog/signin-as-dialog.component';
import { SigninAsDialogModule } from '@shared/components/dialogs/signin-as-dialog/signin-as-dialog.module';

// export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
	declarations: [
		AppComponent,
		MenuLayoutComponent,
		ShareDialogComponent,
		AuthLayoutComponent
	],
	imports: [
		AppRoutingModule,
		CoreModule,
		SharedModule,
		BrowserModule,
		BrowserAnimationsModule,
		AngularFireMessagingModule,
		FormsModule,
		RouterModule,
		DropdownModule,
		LayoutModule,
		MaterialModule,
		HttpClientModule,
		SigninAsDialogModule,
		NgxMaskModule.forRoot(),
		GoogleChartsModule.forRoot(),
		DeviceDetectorModule.forRoot(),
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production
		})
	],
	providers: [AsyncPipe, ErrorInterceptorProvider],
	bootstrap: [AppComponent],
	entryComponents: [ShareDialogComponent, SigninAsDialogComponent]
})
export class AppModule {}
