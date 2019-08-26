import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [HomeComponent, DashboardComponent],
	imports: [
		CommonModule,
		FormsModule,
		DropdownModule,
		HomeRoutingModule,
		GoogleChartsModule.forRoot()
	],
	exports: [],
	providers: []
})
export class HomeModule {}
