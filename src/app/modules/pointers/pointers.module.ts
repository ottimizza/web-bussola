import { SharedModule } from '@shared/shared.module';
import { SelectCompanyModule } from '@shared/components/select-company/select-company.module';
import { AnnotationsModule } from '@shared/components/annotations/annotations.module';
import { ChartModule } from '@shared/components/chart/chart.module';
import { CardModule } from '@shared/components/card/card.module';
import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { PointersComponent } from './pointers.component';
import { PointersRoutingModule } from './pointers-routing.module';
import { MatDialogModule } from '@angular/material';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
	declarations: [PointersComponent],
	imports: [
		CommonModule,
		MatDialogModule,
		SelectCompanyModule,
		PointersRoutingModule,
		CardModule,
		ChartModule,
		SharedModule,
		AnnotationsModule,
		NgxMaskModule
	],
	exports: [],
	providers: [CurrencyPipe]
})
export class PointersModule {}
