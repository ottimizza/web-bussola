import { BalanceModalComponent } from './var-list/modal-balance/modal-balance.component';
import { OrganizationSettingsComponent } from './organization-settings/organization-settings.component';
import { CompanySettingsComponent } from './company-settings/company-settings.component';
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
import { SharedModule } from '@shared/shared.module';
import { SelectCompanyModule } from '@shared/components/select-company/select-company.module';

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
		SelectCompanyModule,
		TableModule,
		MatTooltipModule,
		SharedModule
	],
	exports: [VarListComponent],
	providers: [],
	entryComponents: [BalanceModalComponent]
})
export class OptionsModule {}
