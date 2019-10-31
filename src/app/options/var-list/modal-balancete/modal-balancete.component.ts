import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxLinkifyjsService } from 'ngx-linkifyjs';
import { VariableInfo } from 'src/app/shared/models/variables';

@Component({
	selector: 'app-modal-balancete',
	templateUrl: 'modal-balancete.component.html',
	styleUrls: ['modal-balancete.component.scss']
})
export class ModalBalanceteComponent implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<ModalBalanceteComponent>,
		public linkifyService: NgxLinkifyjsService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	ngOnInit(): void {}

	onVariableChanged(variable: string) {
		const varInfo: VariableInfo = this.data.varInfo;
		varInfo.accountingCode = variable;
		this.data.editVariable(varInfo);
	}
}
