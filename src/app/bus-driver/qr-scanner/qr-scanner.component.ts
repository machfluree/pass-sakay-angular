import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import {
  NgbDate,
  NgbDateStruct,
  NgbTypeahead,
} from '@ng-bootstrap/ng-bootstrap';

import { cityList } from 'src/constants/ph-citymun-list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { PassSakayCollectionService } from 'src/services/pass-sakay-api.service';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent implements OnInit {
  @ViewChild(ZXingScannerComponent) scanner!: ZXingScannerComponent;
  public model!: NgbDateStruct;

  public allowedFormats = [BarcodeFormat.QR_CODE];
  public qrResultString: string = '';

  public cameraDeviceSelect!: FormGroup;
  public tripDetailsFormGroup!: FormGroup;
  public availableDevices!: MediaDeviceInfo[];
  public deviceCurrent!: MediaDeviceInfo | undefined;
  public deviceSelected!: string;

  public scanPayload: Array<any> = [];
  public isFormIncomplete: boolean = true;

  public hasDevices!: boolean;
  public hasPermission!: boolean;

  public parsedCityList: Array<Object | any> = [];

  constructor(
    public snackBarService: MatSnackBar,
    private passSakayAPIService: PassSakayCollectionService
  ) {}

  ngOnInit(): void {
    this.initCityList();
    this.initTripDetailsFormGroup();
  }

  initTripDetailsFormGroup = () => {
    this.tripDetailsFormGroup = new FormGroup({
      tripAction: new FormControl('', Validators.required),
      tripDate: new FormControl('', Validators.required),
      tripStartTime: new FormControl('', Validators.required),
      tripEndTime: new FormControl('', Validators.required),
      routeFrom: new FormControl('', Validators.required),
      routeTo: new FormControl('', Validators.required),
    });
  };

  initCityList(): void {
    const rawCityList = cityList.RECORDS.map((city) => {
      if (city.provCode === '0133') {
        return city;
      }
      return;
    });
    this.parsedCityList = rawCityList.filter((city) => city !== undefined);
    console.log(this.parsedCityList);
  }

  clearResult(): void {
    this.qrResultString = '';
  }

  onCodeResult(resultString: string) {
    console.log(this.scanner.device);
    if (
      !resultString.includes('passenger:') &&
      !this.scanPayload.length &&
      !this.isFormIncomplete
    ) {
      this.openSnackBar('Invalid QR Code.', 'Got it');
      this.scanner.scanStop();
    } else {
      // TODO: add to payload - passenger ID, bus driver ID
      let body: { [key: string]: string } = {};
      this.scanPayload.forEach((item: any) => {
        body[item.key] = item.value;
      });
      this.passSakayAPIService.saveScannedPassengerData(body)
      .then((response: any) => {
        if (response.error) {
          console.log(response);
          this.snackBarService.open(
            'Failed to save scanned QR',
            'Try again'
          );
        }
        if (!response.error) {
          console.log(response)
        }
      })
      .catch((err: any) => {
        console.log('add passenger error', err);
      });;
    }
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onDeviceSelectChange(selected: string) {
    const selectedStr = selected || '';
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find((x) => x.deviceId === selected);
    this.deviceCurrent = device || undefined;
  }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || '';
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    this.deviceCurrent = device || undefined;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  openSnackBar(message: string, action: string) {
    this.snackBarService.open(message, action);
  }

  setScanPayload = () => {
    Object.keys(this.tripDetailsFormGroup.controls).forEach((key: string) => {
      const controlValue = this.tripDetailsFormGroup.controls[key].value;
      if (controlValue) {
        this.scanPayload.push({
          key: key,
          value: controlValue,
        });
      }
    });
  };

  ngDoCheck(): void {
    let isInputNull: number = 0;
    Object.keys(this.tripDetailsFormGroup.controls).forEach((key: any) => {
      const controlValue = this.tripDetailsFormGroup.controls[key].value;
      if (!controlValue) {
        isInputNull++;
      }
    });

    if (isInputNull) {
      this.isFormIncomplete = true;
    } else {
      this.isFormIncomplete = false;
    }
  }
}
