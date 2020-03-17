import { ConfirmDialogModule } from '@shared/components/confirm-dialog/confirm-dialog.module';
import { MaterialModule } from './../../material.module';
import { DescriptionDialogComponent } from './chart-order-config/description-dialog/description-dialog.component';
import { ChartOrderConfigComponent } from './chart-order-config/chart-order-config.component';
import { BalanceModalComponent } from './var-list/modal-balance/modal-balance.component';
import { AccountingSettingsComponent } from './accounting-settings/accounting-settings.component';
import { CompanySettingsComponent } from './company-settings/company-settings.component';
import { VarListComponent } from './var-list/var-list.component';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { OptionsRoutingModule } from './options-routing.module';
import { OptionsComponent } from './options.component';
import { TableModule } from 'primeng/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '@shared/shared.module';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SelectCompanyModule } from '@shared/components/select-company/select-company.module';

@NgModule({
	declarations: [
		OptionsComponent,
		VarListComponent,
		CompanySettingsComponent,
		AccountingSettingsComponent,
		BalanceModalComponent,
		DescriptionDialogComponent,
		ChartOrderConfigComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		MaterialModule,
		OverlayPanelModule,
		DropdownModule,
		DragDropModule,
		OptionsRoutingModule,
		CheckboxModule,
		SelectCompanyModule,
		TableModule,
		MatTooltipModule,
		SharedModule,
		ConfirmDialogModule
	],
	exports: [VarListComponent, ChartOrderConfigComponent],
	providers: [],
	entryComponents: [BalanceModalComponent, DescriptionDialogComponent]
})
export class OptionsModule {}
