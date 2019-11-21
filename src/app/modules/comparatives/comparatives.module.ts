import { SharedModule } from '@shared/shared.module';
import { ComparativesRoutingModule } from './comparatives-routing.module';
import { CarouselModule } from 'primeng/carousel';
import { NgModule } from '@angular/core';
import { ComparativesComponent } from './comparatives.component';
import { CommonModule } from '@angular/common';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
	declarations: [ComparativesComponent],
	imports: [
		CommonModule,
		ComparativesRoutingModule,
		CarouselModule,
		SharedModule,
		GoogleChartsModule.forRoot()
	],
	exports: [],
	providers: []
})
export class ComparativesModule {}
