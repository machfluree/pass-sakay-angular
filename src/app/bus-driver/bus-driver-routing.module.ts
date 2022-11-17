import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusDriverComponent } from './bus-driver.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';

const routes: Routes = [
  {
    path: 'bus-driver',
    component: BusDriverComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'qr-scanner',
        component: QrScannerComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusDriverRoutingModule { }
