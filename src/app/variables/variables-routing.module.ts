import { OrganizationVariablesComponent } from './organization-variables/organization-variables.component';
import { CompanyVariablesComponent } from './company-variables/company-variables.component';
import { VariablesComponent } from './variables.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'company',
		pathMatch: 'full',
		component: CompanyVariablesComponent
	},
	{
		path: 'organization',
		pathMatch: 'full',
		component: OrganizationVariablesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class VariablesRoutingModule {}
