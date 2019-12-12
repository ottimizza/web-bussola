import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCompanyComponent } from './select-company.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
	declarations: [SelectCompanyComponent],
	imports: [CommonModule, FormsModule, MatExpansionModule],
	exports: [SelectCompanyComponent],
	providers: []
})
export class SelectCompanyModule {}
