import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConvUnitRoutingModule } from './conv-unit-routing.module';
import { ConvUnitComponent } from './conv-unit/conv-unit.component';
import { MaterialModule } from '../material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ConvUnitComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ConvUnitRoutingModule
  ],
  exports: [ConvUnitComponent]
})
export class ConvUnitModule { }
