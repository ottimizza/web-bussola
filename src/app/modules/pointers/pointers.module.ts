import { AnnotationsModule } from './../../shared/components/annotations/annotations.module';
import { SelectCompanyModule } from '@shared/components/select-company/select-company.module';
import { ChartModule } from '@shared/components/chart/chart.module';
import { CardModule } from '@shared/components/card/card.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointersComponent } from './pointers.component';
import { PointersRoutingModule } from './pointers-routing.module';
import { MatDialogModule } from '@angular/material';

@NgModule({
	declarations: [PointersComponent],
	imports: [
		CommonModule,
		MatDialogModule,
		PointersRoutingModule,
		CardModule,
		ChartModule,
		AnnotationsModule,
		SelectCompanyModule
	],
	exports: [],
	providers: []
})
export class PointersModule {}
