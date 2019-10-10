import { MatDialogModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { HomeRoutingModule } from './home-routing.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ModalDashboardComponent } from './dashboard/modal-dashboard/modal-dashboard.component';
import { ContenteditableModule } from '@ng-stack/contenteditable';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';

@NgModule({
	declarations: [HomeComponent, DashboardComponent, ModalDashboardComponent],
	imports: [
		CommonModule,
		FormsModule,
		DropdownModule,
		HomeRoutingModule,
		MatDialogModule,
		NgxLinkifyjsModule,
		FileUploadModule,
		ButtonModule,
		ContenteditableModule,
		GoogleChartsModule.forRoot()
	],
	exports: [],
	providers: [],
	entryComponents: [ModalDashboardComponent]
})
export class HomeModule {}
