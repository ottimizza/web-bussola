import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanySelectDropdownComponent } from './company-select-dropdown.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';

@NgModule({
	declarations: [CompanySelectDropdownComponent],
	imports: [CommonModule, FormsModule, SelectDropDownModule],
	exports: [CompanySelectDropdownComponent],
	providers: []
})
export class CompanySelectDropdownModule {}
