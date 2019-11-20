import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { PointersComponent } from './pointers.component';

const routes: Routes = [
	{
		path: '',
		component: PointersComponent,
		children: []
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PointersRoutingModule {}
