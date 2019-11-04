import { BalanceItem } from './../../../shared/models/balante-item';
import { BalanceService } from './../../../shared/services/balance.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxLinkifyjsService } from 'ngx-linkifyjs';
import { VariableInfo } from 'src/app/shared/models/variables';

@Component({
	selector: 'app-modal-balance',
	templateUrl: 'modal-balance.component.html',
	styleUrls: ['modal-balance.component.scss']
})
export class BalanceModalComponent implements OnInit {
	variableInfo: VariableInfo;
	balance: BalanceItem[];

	constructor(
		public dialogRef: MatDialogRef<BalanceModalComponent>,
		public linkifyService: NgxLinkifyjsService,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private balanceService: BalanceService
	) {}

	ngOnInit(): void {
		this.variableInfo = this.data.variableInfo;
		this.balanceService
			.findBalance('09008007000199')
			.subscribe((balance: BalanceItem[]) => (this.balance = balance));
	}

	onVariableChanged(sign: string, code: string) {
		this.variableInfo.accountingCode += sign + code;
		this.data.editVariable(this.variableInfo);
	}
}
