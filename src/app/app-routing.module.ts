import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
