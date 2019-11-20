import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SwUpdate } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	public static apiOauthService: string;
	public static loginUrl: string;
	public static appApi: string;
	public static storageUrl: string;
	public static clientId: string;
	public static applicationId: string;

	message: BehaviorSubject<any>;
	subscription: Subscription;
	deferredPrompt: any;
	showButton = false;

	constructor(private router: Router, private swUpdate: SwUpdate) {}

	@HostListener('window:beforeinstallprompt', ['$event'])
	onbeforeinstallprompt(e: any) {
		console.log(e);
		// Prevent Chrome 67 and earlier from automatically showing the prompt
		e.preventDefault();
		// Stash the event so it can be triggered later.
		this.deferredPrompt = e;
	}

	ngOnInit() {
		// const userId = 'user001';
		// this.messagingService.requestPermission(userId);
		// this.messagingService.receiveMessage();
		// this.message = this.messagingService.currentMessage;

		if (environment.production) {
			if (location.protocol === 'http:') {
				location.href = location.href.replace('http', 'https');
			}
		}

		this.subscription = this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(() => window.scrollTo(0, 0));

		if (this.swUpdate.isEnabled) {
			this.swUpdate.available.subscribe(() => {
				console.log('Nova versão disponível.');
				if (
					confirm(
						'Nova versão disponível. Deseja atualizar a página?'
					)
				) {
					window.location.reload();
				}
			});
		}
	}

	ngOnDestroy() {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

	addToHomeScreen() {
		// hide our user interface that shows our A2HS button
		this.showButton = false;
		// Show the prompt
		this.deferredPrompt.prompt();
		// Wait for the user to respond to the prompt
		this.deferredPrompt.userChoice.then(choiceResult => {
			if (choiceResult.outcome === 'accepted') {
				console.log('User accepted the A2HS prompt');
			} else {
				console.log('User dismissed the A2HS prompt');
			}
			this.deferredPrompt = null;
		});
	}
}
