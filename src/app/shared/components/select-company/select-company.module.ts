import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCompanyComponent } from './select-company.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { InputTextModule } from 'primeng/inputtext';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
	declarations: [SelectCompanyComponent],
	imports: [
		CommonModule,
		FormsModule,
		MatExpansionModule,
		InputTextModule,
		NgxMaskModule
	],
	exports: [SelectCompanyComponent],
	providers: []
})
export class SelectCompanyModule {}
