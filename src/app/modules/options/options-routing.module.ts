import { AccountingSettingsComponent } from './accounting-settings/accounting-settings.component';
import { CompanySettingsComponent } from './company-settings/company-settings.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'company',
		pathMatch: 'full',
		component: CompanySettingsComponent
	},
	{
		path: 'accounting',
		pathMatch: 'full',
		component: AccountingSettingsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class OptionsRoutingModule {}
