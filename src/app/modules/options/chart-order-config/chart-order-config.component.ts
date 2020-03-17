import { ConfirmDialogComponent } from './../../../shared/components/confirm-dialog/confirm-dialog.component';
import { DescriptionDialogComponent } from './description-dialog/description-dialog.component';
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
	EventEmitter,
	ChangeDetectorRef
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { OverlayPanel } from 'primeng/overlaypanel';
import { User } from '@app/models/User';
import { ToastService } from '@shared/services/toast.service';

@Component({
	selector: 'chart-order-config',
	templateUrl: './chart-order-config.component.html',
	styleUrls: ['./chart-order-config.component.scss']
})
export class ChartOrderConfigComponent implements OnInit {
	@Input() descriptions: Description[];
	@Input() title = 'Indicadores';
	@Output() onDescriptionChanged = new EventEmitter<Description[]>();

	@ViewChild('table') table: MatTable<Description>;

	private descriptionsSubject = new Subject();

	selectedDescription: Description;

	userType = User.fromLocalStorage().type;

	displayedColumns: string[] = [
		'position',
		'visibility',
		'title',
		'type',
		'description'
	];

	constructor(
		private matDialog: MatDialog,
		private descriptionService: DescriptionService,
		private toastService: ToastService
	) {}

	ngOnInit() {
		this.descriptionsSubject.pipe(debounceTime(300)).subscribe(() => {
			this.updateDescriptionList();
		});
	}

	updateDescriptionList() {
		for (let i = 0; i < this.descriptions.length; i++) {
			this.descriptions[i].graphOrder = i;
		}
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

	updateDescription(description: Description) {
		this.descriptionService.patchDescription(description).subscribe();
	}

	delete(description: Description) {
		const id = this.descriptions.indexOf(description);

		const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
			data: {
				title: 'Deseja realmente excluir este indicador?',
				content: 'Esta ação não poderá ser desfeita.'
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.descriptionService
					.deleteDescription(description.id)
					.subscribe((info: any) => {
						const array: Description[] = JSON.parse(
							JSON.stringify(this.descriptions)
						);
						array.splice(id, 1);
						this.descriptions = array;
						this.toastService.show(info.message, info.status);
					});
			}
		});
	}

	openModal(description: Description) {
		const that = this;
		this.matDialog.open(DescriptionDialogComponent, {
			width: '30rem',
			data: {
				description,
				saveDescription: (d: Description) => {
					that.updateDescription(d);
				}
			}
		});
	}
}
