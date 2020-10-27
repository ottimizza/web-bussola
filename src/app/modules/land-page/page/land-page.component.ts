import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { User } from '@app/models/User';
import { environment } from '@env';

@Component({
	selector: 'app-land-page',
	templateUrl: './land-page.component.html',
	styleUrls: ['./land-page.component.scss']
})
export class LandPageComponent implements OnInit {
	currentUser: User;

	supportNumber = '+5547999455447';
	defaultMessage = ['Estou', 'com', 'dificuldades', 'de', 'acesso', 'ao', 'Bussola'];

	defaultColor = environment.backgroundTheme;
	supportUrl = environment.supportUrl;

	constructor(private authenticationService: AuthenticationService) { }

	ngOnInit(): void {
		this.currentUser = User.fromLocalStorage();
	}

	authenticate() {
		this.authenticationService.clearStorage();
		this.authenticationService.authorize();
	}

}
