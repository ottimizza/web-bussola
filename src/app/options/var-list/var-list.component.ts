import { debounceTime } from 'rxjs/operators';
import {
	Component,
	OnInit,
	Input,
	HostListener,
	Output,
	EventEmitter
} from '@angular/core';
import { VariableInfo } from 'src/app/shared/models/variables';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-var-list',
	templateUrl: './var-list.component.html',
	styleUrls: ['./var-list.component.scss']
})
export class VarListComponent implements OnInit {
	@Input() variables: VariableInfo[] = [];
	@Output() onVariableEdited = new EventEmitter<VariableInfo>();

	regexStr = /(\d)|(\.)|(\+)|(\-)/;

	private variableSubject = new Subject<VariableInfo>();

	@HostListener('keypress', ['$event']) onKeyPress(event: any) {
		return new RegExp(this.regexStr).test(event.key);
	}

	constructor() {}

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
}
