import { VariablesRoutingModule } from './variables-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariablesComponent } from './variables.component';

@NgModule({
	declarations: [VariablesComponent],
	imports: [CommonModule, VariablesRoutingModule],
	exports: [],
	providers: []
})
export class VariablesModule {}
