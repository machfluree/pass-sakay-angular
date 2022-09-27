import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusDriverComponent } from './bus-driver.component';

const routes: Routes = [{ path: '', component: BusDriverComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusDriverRoutingModule { }
