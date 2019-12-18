import { SelectCompanyModule } from '@shared/components/select-company/select-company.module';
import { ChartModule } from '@shared/components/chart/chart.module';
import { CardModule } from '@shared/components/card/card.module';
import { ComparativesRoutingModule } from './comparatives-routing.module';
import { NgModule } from '@angular/core';
import { ComparativesComponent } from './comparatives.component';
import { CommonModule, CurrencyPipe } from '@angular/common';

@NgModule({
	declarations: [ComparativesComponent],
	imports: [
		CommonModule,
		ComparativesRoutingModule,
		SelectCompanyModule,
		CardModule,
		ChartModule
	],
	exports: [],
	providers: [CurrencyPipe]
})
export class ComparativesModule {}
