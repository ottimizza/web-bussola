import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
	declarations: [ConfirmDialogComponent],
	imports: [CommonModule, MatDialogModule, MatButtonModule],
	entryComponents: [ConfirmDialogComponent]
})
export class ConfirmDialogModule {}
