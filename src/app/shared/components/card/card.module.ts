import { ChartDescriptionModule } from './../chart-description/chart-description.module';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [CardComponent],
	imports: [CommonModule, FormsModule, ChartDescriptionModule],
	exports: [CardComponent],
	providers: []
})
export class CardModule {}
