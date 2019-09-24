import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-modal-dashboard',
	templateUrl: './modal-dashboard.component.html',
	styleUrls: ['./modal-dashboard.component.scss']
})
export class ModalDashboardComponent implements OnInit {

	textArea = '';

	constructor(
		public dialogRef: MatDialogRef<ModalDashboardComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	ngOnInit(): void {}

	close() {
		this.dialogRef.close();
	}
}
