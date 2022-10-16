import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrScannerRoutingModule } from './qr-scanner-routing.module';
import { QrScannerComponent } from './qr-scanner.component';


@NgModule({
  declarations: [
    QrScannerComponent
  ],
  imports: [
    CommonModule,
    QrScannerRoutingModule
  ]
})
export class QrScannerModule { }
