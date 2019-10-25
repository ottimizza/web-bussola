import { CompanyVarListComponent } from './company-var-list/company-var-list.component';
import { VariablesComponent } from './variables.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'clientes',
		component: VariablesComponent,
		children: []
	},
	{
		path: 'contabilidade',
		component: CompanyVarListComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class VariablesRoutingModule {}
