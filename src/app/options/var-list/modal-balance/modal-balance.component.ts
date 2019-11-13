import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
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
	balance: BalanceItem[] = [];
	cnpj: string;

	hasMore = true;
	scrollIsLoading = false;
	pageIndex = 0;
	filter = '';

	private filterSubject = new Subject();

	constructor(
		public dialogRef: MatDialogRef<BalanceModalComponent>,
		public linkifyService: NgxLinkifyjsService,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private balanceService: BalanceService
	) {}

	ngOnInit(): void {
		this.variableInfo = this.data.variableInfo;
		this.cnpj = this.data.cnpj;
		this.loadMoreBalance();

		this.filterSubject.pipe(debounceTime(300)).subscribe(() => {
			this.pageIndex = 0;
			this.loadMoreBalance();
		});

		const that = this;
		$('#scrollContent').on('scroll', function() {
			const scrollTop = $(this).scrollTop();
			if (
				scrollTop + $(this).innerHeight() >= this.scrollHeight - 1 &&
				that.hasMore &&
				!that.scrollIsLoading
			) {
				that.scrollIsLoading = true;
				that.loadMoreBalance();
			}
		});
	}

	loadMoreBalance(filtered: boolean = false) {
		this.balanceService
			.findBalance(this.cnpj, this.pageIndex, this.filter)
			.subscribe((balance: any) => {
				this.pageIndex++;
				this.balance = filtered
					? this.balance.concat(balance.content)
					: balance.content;
				this.scrollIsLoading = false;
				this.hasMore = balance.content.length === 10;
			});
	}

	onFilterInput() {
		this.filterSubject.next();
	}

	onVariableChanged(sign: string, code: string) {
		this.variableInfo.accountingCode += sign + code;
		this.data.editVariable(this.variableInfo);
	}

	onVariableInput() {
		this.data.editVariable(this.variableInfo);
	}
}
