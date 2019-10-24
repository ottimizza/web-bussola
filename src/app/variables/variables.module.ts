import { CompanyVarListComponent } from './company-var-list/company-var-list.component';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { VariablesRoutingModule } from './variables-routing.module';
import { VariablesComponent } from './variables.component';
import { TableModule } from 'primeng/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
	declarations: [VariablesComponent, CompanyVarListComponent],
	imports: [
		CommonModule,
		FormsModule,
		DropdownModule,
		VariablesRoutingModule,
		TableModule,
		MatTooltipModule
	],
	exports: [],
	providers: []
})
export class VariablesModule {}
