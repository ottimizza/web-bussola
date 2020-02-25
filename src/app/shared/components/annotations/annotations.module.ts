import { FormsModule } from '@angular/forms';
import { ContenteditableModule } from '@ng-stack/contenteditable';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnotationsComponent } from './annotations.component';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@NgModule({
	declarations: [AnnotationsComponent],
	imports: [
		CommonModule,
		FormsModule,
		MatDialogModule,
		ButtonModule,
		FileUploadModule,
		ContenteditableModule
	],
	exports: [AnnotationsComponent],
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
	entryComponents: [AnnotationsComponent]
})
export class AnnotationsModule {}
