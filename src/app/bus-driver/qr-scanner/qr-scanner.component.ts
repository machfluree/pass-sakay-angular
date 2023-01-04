import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { cityList } from 'src/constants/ph-citymun-list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BusDriverComponent } from '../bus-driver.component';
import { PassSakayCollectionService } from 'src/services/pass-sakay-api.service';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent implements OnInit {
  @ViewChild(ZXingScannerComponent) scanner!: ZXingScannerComponent;

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
  public scannerEnabled: boolean = false;

  public tripScheduleList: Array<any> = []

  public parsedCityList: Array<Object | any> = [];

  constructor(
    private cd: ChangeDetectorRef,
    public snackBarService: MatSnackBar,
    private passSakayAPIService: PassSakayCollectionService,
    private busAccount: BusDriverComponent
  ) {}

  ngOnInit(): void {
    this.initCityList();
    this.initTripDetailsFormGroup();
    this.getAllTripSchedules()
    // this.stopScaning();
  }

  initTripDetailsFormGroup = () => {
    this.tripDetailsFormGroup = new FormGroup({
      tripAction: new FormControl('', Validators.required),
      tripSched: new FormControl('', Validators.required),
    });

    this.tripDetailsFormGroup.patchValue({tripAction: 'scan-in'});
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

  onCodeResult(resultString: any) {
    this.scannerEnabled = false;
    const passengerData = JSON.parse(resultString)
    if (
      !passengerData &&
      !passengerData.passenger
    ) {
      this.openSnackBar('Invalid QR Code.', 'Got it');
      this.cd.markForCheck();
    } else {
      // TODO: add to payload - passenger ID, bus driver ID
      const tripType = this.tripDetailsFormGroup.get('tripAction');
      const tripSched = this.tripDetailsFormGroup.get('tripSched');
      const busAccount = this.busAccount.userData._userId;

      let body: Object = {
        passengerAccount: passengerData.passenger || null,
        tripType: tripType?.value || null,
        busAccount: busAccount || null,
        tripSched: tripSched?.value || null,
        date: Date.now(),
        time: Date.now(),
      };

      console.log(body)
      this.passSakayAPIService.saveScannedPassengerData(body)
      .then((response: any) => {
        if (response) {
          this.snackBarService.open(
            'Successfully Scanned QR.',
            'Got it'
          );
          console.log(response)
          this.cd.markForCheck();
        }
      })
      .catch((err: any) => {
        console.log('add passenger error', err);
        this.cd.markForCheck();
      });
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

  getAllTripSchedules = () => {
    this.passSakayAPIService
      .getAllTripScheduleData()
      .then((data: any) => {
        data.forEach((tripSched: any, index: number) => {
          this.tripScheduleList.push({
            _id: tripSched._id,
            rowId: index + 1,
            ScheduleName: tripSched.name,
            BusName: tripSched.busAccount.busName,
            Days: tripSched.daysRoutine.join(', '),
            Time: `${tripSched.startTime} - ${tripSched.endTime}`,
            Route: `${tripSched.startingPoint} - ${tripSched.finishingPoint}`,
            Status: tripSched.status,
          });
        });
      })
      .catch((error: any) => {
        this.snackBarService.open(
          'Failed to load passenger data. Check your internet connection.',
          'Got it'
        );
      });
  };

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

  enableScanning = () => {
    this.scannerEnabled = !this.scannerEnabled;
  }

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
