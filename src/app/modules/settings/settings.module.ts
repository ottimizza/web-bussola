import { SettingsRoutingModule } from './settings-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';

@NgModule({
	declarations: [SettingsComponent],
	imports: [CommonModule, SettingsRoutingModule],
	exports: [],
	providers: []
})
export class SettingsModule {}
