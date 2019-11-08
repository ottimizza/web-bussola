import { BalanceModalComponent } from './modal-balance/modal-balance.component';
import { debounceTime } from 'rxjs/operators';
import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	HostListener
} from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { VariableInfo } from 'src/app/shared/models/variables';
import { DeviceDetectorService } from 'ngx-device-detector';

const regexStr = /(\d)|(\.)|(\+)|(\-)/;

@Component({
	selector: 'app-var-list',
	templateUrl: './var-list.component.html',
	styleUrls: ['./var-list.component.scss']
})
export class VarListComponent implements OnInit {
	@Input() variables: VariableInfo[] = [];
	@Input() organizationCnpj: string;
	@Output() onVariableEdited = new EventEmitter<VariableInfo>();
	isMobile = this.deviceService.isMobile;

	private variableSubject = new Subject<VariableInfo>();

	@HostListener('keypress', ['$event']) onKeyPress(event: any) {
		return new RegExp(regexStr).test(event.key);
	}

	constructor(
		private matDialog: MatDialog,
		private deviceService: DeviceDetectorService
	) {}

	ngOnInit(): void {
		this.variableSubject
			.pipe(debounceTime(300))
			.subscribe((term: VariableInfo) => this.updateVariable(term));
	}

	onVarEdited(variableInfo: VariableInfo) {
		this.variableSubject.next(variableInfo);
	}

	updateVariable(variableInfo: VariableInfo) {
		this.onVariableEdited.emit(variableInfo);
	}

	openModal(variableInfo: VariableInfo) {
		const that = this;
		this.matDialog.open(BalanceModalComponent, {
			width: '50rem',
			data: {
				variableInfo,
				editVariable: (varInfo: VariableInfo) => {
					that.onVarEdited(varInfo);
				}
			}
		});
	}
}
