import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCompanyComponent } from './select-company.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
	declarations: [SelectCompanyComponent],
	imports: [CommonModule, DropdownModule],
	exports: [SelectCompanyComponent],
	providers: []
})
export class SelectCompanyModule {}
