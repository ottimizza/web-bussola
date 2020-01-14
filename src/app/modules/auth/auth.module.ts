import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthCallbackComponent } from './page/callback/callback.component';
import { AuthRoutingModule } from './auth.routing';

// import { SharedModule } from '@shared/shared.module';

// import { UserDetailsComponent } from './page/user-details/user-details.component';

@NgModule({
	declarations: [AuthCallbackComponent],
	imports: [CommonModule, AuthRoutingModule],
	exports: [],
	providers: [],
	entryComponents: []
})
export class AuthModule {}
