import { BalanceModalComponent } from './var-list/modal-balance/modal-balance.component';
import { OrganizationSettingsComponent } from './organization-settings/organization-settings.component';
import { CompanySettingsComponent } from './company-settings/company-settings.component';
import { SharedModule } from '../shared/shared.module';
import { VarListComponent } from './var-list/var-list.component';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { OptionsRoutingModule } from './options-routing.module';
import { OptionsComponent } from './options.component';
import { TableModule } from 'primeng/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material';

@NgModule({
	declarations: [
		OptionsComponent,
		VarListComponent,
		CompanySettingsComponent,
		OrganizationSettingsComponent,
		BalanceModalComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		MatDialogModule,
		DropdownModule,
		OptionsRoutingModule,
		CheckboxModule,
		TableModule,
		MatTooltipModule,
		SharedModule
	],
	exports: [VarListComponent],
	providers: [],
	entryComponents: [BalanceModalComponent]
})
export class OptionsModule {}
