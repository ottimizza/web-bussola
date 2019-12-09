import { GoogleChartsModule } from 'angular-google-charts';
import { ChartComponent } from './chart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [ChartComponent],
	imports: [CommonModule, GoogleChartsModule],
	exports: [ChartComponent],
	providers: []
})
export class ChartModule {}
