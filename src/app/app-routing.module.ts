import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'passenger',
    loadChildren: () =>
      import('./passenger/passenger.module').then((m) => m.PassengerModule),
  },
  {
    path: 'bus-driver',
    loadChildren: () =>
      import('./bus-driver/bus-driver.module').then((m) => m.BusDriverModule),
  },
  { path: 'qr-scanner', loadChildren: () => import('./bus-driver/qr-scanner/qr-scanner.module').then(m => m.QrScannerModule) },
  // {
  //   path: 'qrscanner',
  //   loadChildren: () =>
  //     import('./qrscanner/qrscanner.module').then((m) => m.QrscannerModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
