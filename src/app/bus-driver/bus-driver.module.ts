import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusDriverRoutingModule } from './bus-driver-routing.module';
import { BusDriverComponent } from './bus-driver.component';


@NgModule({
  declarations: [
    BusDriverComponent
  ],
  imports: [
    CommonModule,
    BusDriverRoutingModule
  ]
})
export class BusDriverModule { }
