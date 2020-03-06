import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { User } from '@app/models/User';

// CALANDO A BOCA DO COMPILADOR
// tslint:disable-next-line: no-var-keyword prefer-const
var window: any;

interface SafariPushNotificationPermissionData {
	permission: 'default' | 'granted' | 'denied';
	deviceToken?: any;
}

@Injectable()
export class NotificationService {
	constructor() {}

	requestSafariNotificationPermission() {
		if ('safari' in window && 'pushNotification' in window.safari) {
			const permissionData: SafariPushNotificationPermissionData = window.safari.pushNotification.permission(
				'web.br.com.ottimizza.bussola'
			);
			this.checkRemotePermission(permissionData);
		}
	}

	checkRemotePermission = (
		permissionData: SafariPushNotificationPermissionData
	) => {
		if (permissionData.permission === 'default') {
			// This is a new web service URL and its validity is unknown.
			window.safari.pushNotification.requestPermission(
				`${environment.appApi}/safariPush`, // The web service URL.
				'web.br.com.ottimizza.bussola', // The Website Push ID.
				User.fromLocalStorage().email, // Data that you choose to send to your server to help you identify the user.
				this.checkRemotePermission // The callback function.
			);
		} else if (permissionData.permission === 'denied') {
			// The user said no.
		} else if (permissionData.permission === 'granted') {
			// The web service URL is a valid push provider, and the user said yes.
			// permissionData.deviceToken is now available to use.
		}
	};
}
