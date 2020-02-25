import { Description } from '@shared/models/description';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
	description: Description;
	saveDescription(description: Description): void;
}

@Component({
	selector: 'description-dialog',
	templateUrl: './description-dialog.component.html'
})
export class DescriptionDialogComponent implements OnInit {
	description: Description;

	constructor(
		public dialogRef: MatDialogRef<DescriptionDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	) {}

	ngOnInit() {
		this.description = this.data.description;
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	onSave() {
		this.data.saveDescription(this.description);
		this.dialogRef.close();
	}
}
