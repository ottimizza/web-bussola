import { OrganizationSettingsComponent } from './organization-settings/organization-settings.component';
import { CompanySettingsComponent } from './company-settings/company-settings.component';
import { SharedModule } from '../shared/shared.module';
import { VarListComponent } from './var-list/var-list.component';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { OptionsRoutingModule } from './options-routing.module';
import { OptionsComponent } from './options.component';
import { TableModule } from 'primeng/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
	declarations: [
		OptionsComponent,
		VarListComponent,
		CompanySettingsComponent,
		OrganizationSettingsComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		DropdownModule,
		OptionsRoutingModule,
		TableModule,
		MatTooltipModule,
		SharedModule
	],
	exports: [VarListComponent],
	providers: []
})
export class OptionsModule {}
