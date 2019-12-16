import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MinusSignToParens } from './pipe/minus-sign-to-parentheses.pipe';

@NgModule({
	declarations: [MinusSignToParens],
	imports: [CommonModule, RouterModule, HttpClientModule],
	exports: [MinusSignToParens],
	providers: []
})
export class SharedModule {}
