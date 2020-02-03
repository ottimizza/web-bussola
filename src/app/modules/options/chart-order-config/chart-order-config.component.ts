import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DescriptionService } from '@shared/services/description.service';
import { Description } from '@shared/models/description';
import {
	Component,
	OnInit,
	Input,
	ViewChild,
	Output,
	EventEmitter
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
	selector: 'chart-order-config',
	templateUrl: './chart-order-config.component.html',
	styleUrls: ['./chart-order-config.component.scss']
})
export class ChartOrderConfigComponent implements OnInit {
	@Input() descriptions: Description[];
	@Output() onDescriptionChanged = new EventEmitter<Description[]>();

	@ViewChild('table', { static: false }) table: MatTable<Description>;

	private descriptionsSubject = new Subject();

	selectedDescription: Description;

	displayedColumns: string[] = [
		'position',
		'visibility',
		'title',
		'type',
		'description'
	];

	constructor() {}

	ngOnInit() {
		this.descriptionsSubject.pipe(debounceTime(300)).subscribe(() => {
			this.updateDescriptionList();
		});
	}

	updateDescriptionList() {
		for (let i = 0; i < this.descriptions.length; i++) {
			this.descriptions[i].graphOrder = i;
		}
		console.log(this.descriptions);
		this.onDescriptionChanged.emit(this.descriptions);
	}

	dropTable(event: CdkDragDrop<Description[]>) {
		const prevIndex = this.descriptions.findIndex(
			d => d === event.item.data
		);
		moveItemInArray(this.descriptions, prevIndex, event.currentIndex);
		this.table.renderRows();
		this.descriptionsSubject.next();
	}

	descriptionUpdated() {
		this.descriptionsSubject.next();
	}

	descriptionSelected(
		event,
		description: Description,
		overlayPanel: OverlayPanel
	) {
		this.selectedDescription = description;
		overlayPanel.toggle(event);
	}
}
