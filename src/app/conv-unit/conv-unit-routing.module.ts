import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConvUnitComponent } from './conv-unit/conv-unit.component';


const routes: Routes = [
  { path: '', component: ConvUnitComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConvUnitRoutingModule { }
