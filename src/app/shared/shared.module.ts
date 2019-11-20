import { SelectCompanyComponent } from './components/select-company/select-company.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatSidenavModule,
	MatListModule,
	MatButtonModule,
	MatIconModule,
	MatToolbarModule,
	MatSnackBarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [SelectCompanyComponent],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		DropdownModule,
		LayoutModule,
		MatButtonModule,
		MatIconModule,
		MatListModule,
		MatSidenavModule,
		MatToolbarModule,
		HttpClientModule,
		MatSnackBarModule
	],
	exports: [SelectCompanyComponent],
	providers: []
})
export class SharedModule {}
