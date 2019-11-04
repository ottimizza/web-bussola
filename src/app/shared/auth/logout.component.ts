import { AppComponent } from './../../app.component';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
	selector: 'app-logout',
	template:
		// cria um iframe para o oauth server poder excluir os cookies relacionados
		// iframe invisivel para não ser visualizavel pelo cliente.
		'<iframe [src]="url" (load)="onLoad()" id="iframe" width="0" height="0"></iframe>'
})
export class LogoutComponent implements OnInit {
	// cria um iframe para o oauth server poder excluir os cookies relacionados
	url = this.sanitizer.bypassSecurityTrustResourceUrl(
		`${AppComponent.apiOauthService}/logout`
	);

	constructor(
		@Inject(DOCUMENT) private document: Document,
		public sanitizer: DomSanitizer,
		private authService: AuthService,
		private router: Router
	) {}

	// evento invocado após o iframe tenha sido carregado.
	public onLoad() {
		setTimeout(() => {
			this.logout();
		}, 1000);
	}

	public logout() {
		this.authService.logout();
		this.router.navigate(['login']);
	}

	ngOnInit(): void {}
}
