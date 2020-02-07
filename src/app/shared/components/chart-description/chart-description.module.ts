import { ChartDescriptionComponent } from './chart-description.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
	MatDialogModule,
	MatDialogRef,
	MAT_DIALOG_DATA
} from '@angular/material';

@NgModule({
	declarations: [ChartDescriptionComponent],
	imports: [CommonModule, FormsModule, MatDialogModule],
	exports: [ChartDescriptionComponent],
	providers: [
		{
			provide: MatDialogRef,
			useValue: {}
		},
		{
			provide: MAT_DIALOG_DATA,
			useValue: {}
		}
	],
	entryComponents: [ChartDescriptionComponent]
})
export class ChartDescriptionModule {}
