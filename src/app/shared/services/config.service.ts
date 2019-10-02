import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './../../app.component';

@Injectable({ providedIn: 'root' })
export class ConfigService {
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
				AppComponent.apiOauthService = data.apiOauthService;
				AppComponent.loginUrl = data.loginUrl;
				AppComponent.appApi = data.appApi;
				AppComponent.clientId = data.clientId;
				AppComponent.storageUrl = data.storageUrl;

				resolve();
			});
		});
	}
}
