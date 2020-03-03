import { Company } from '@shared/models/company';
import { ChartDescriptionComponent } from '../chart-description/chart-description.component';
import { Component, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss']
})
export class CardComponent {
	@Input() title: string;
	@Input() subtitle: string;
	@Input() cnpj: string;
	@Input() kpiAlias: string;

	isMobile = this.deviceService.isMobile();

	constructor(
		private deviceService: DeviceDetectorService,
		private dialog: MatDialog
	) {}

	openModal() {
		this.dialog.open(ChartDescriptionComponent, {
			width: '33rem',
			data: {
				cnpj: this.cnpj,
				kpiAlias: this.kpiAlias
			}
		});
	}
}
