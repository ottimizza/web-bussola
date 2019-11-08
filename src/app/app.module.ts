import { AuthGuard } from './shared/auth/auth.guard';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleChartsModule } from 'angular-google-charts';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ConfigService } from './shared/services/config.service';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { AsyncPipe } from '@angular/common';
import { DeviceDetectorModule } from 'ngx-device-detector';

import * as $ from 'jquery';

const appInitializerFn = (appConfig: ConfigService) => {
	return () => {
		return appConfig.setDefautlVariables();
	};
};

@NgModule({
	declarations: [AppComponent],
	imports: [
		AppRoutingModule,
		SharedModule,
		BrowserModule,
		BrowserAnimationsModule,
		AngularFireMessagingModule,
		GoogleChartsModule.forRoot(),
		NgxLinkifyjsModule.forRoot(),
		DeviceDetectorModule.forRoot(),
		AngularFireModule.initializeApp(environment.firebase),
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production
		})
	],
	providers: [
		AsyncPipe,
		AuthGuard,
		ConfigService,
		{
			provide: APP_INITIALIZER,
			useFactory: appInitializerFn,
			multi: true,
			deps: [ConfigService]
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
