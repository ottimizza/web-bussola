import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComparativesComponent } from './comparatives.component';

const routes: Routes = [
	{
		path: '',
		component: ComparativesComponent,
		children: []
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ComparativesRoutingModule {}
