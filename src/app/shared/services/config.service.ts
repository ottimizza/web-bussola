import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './../../app.component';

@Injectable({ providedIn: 'root' })
export class ConfigService {
	public static apiOauthService: string;
	public static loginUrl: string;
	public static appApi: string;

	public appConfig: any = {
		apiOauthService: '',
		loginUrl: '',
		appApi: ''
	};

	constructor(private http: HttpClient) {}

	public async loadAppConfig(): Promise<any> {
		return this.http
			.get('/assets/data/appConfig.json')
			.toPromise()
			.then((data: any) => {
				try {
					return JSON.parse(data);
				} catch (e) {
					return data;
				}
			});
	}

	public async setDefautlVariables(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.loadAppConfig().then((data: any) => {
				AppComponent.apiOauthService = data.API_OAUTH_SERVICE;
				AppComponent.loginUrl = data.LOGIN_URL;
				AppComponent.appApi = data.APP_API;

				resolve();
			});
		});
	}
}
