import { SharedModule } from './../shared/shared.module';
import { CompanyVariablesComponent } from './company-variables/company-variables.component';
import { OrganizationVariablesComponent } from './organization-variables/organization-variables.component';
import { VarListComponent } from './var-list/var-list.component';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { VariablesRoutingModule } from './variables-routing.module';
import { VariablesComponent } from './variables.component';
import { TableModule } from 'primeng/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
	declarations: [
		VariablesComponent,
		VarListComponent,
		OrganizationVariablesComponent,
		CompanyVariablesComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		DropdownModule,
		VariablesRoutingModule,
		TableModule,
		MatTooltipModule,
		SharedModule
	],
	exports: [VarListComponent],
	providers: []
})
export class VariablesModule {}
