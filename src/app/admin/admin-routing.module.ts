import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { BusAccountComponent } from './bus-accounts/bus-accounts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PassengerComponent } from './passenger/passenger.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'passengers',
        component: PassengerComponent,
      },
      {
        path: 'bus-accounts',
        component: BusAccountComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }