import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/services/local-storage.service';
import { PassSakayCollectionService } from 'src/services/pass-sakay-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private route: Router,
    private snackBarService: MatSnackBar,
    private passSakayAPIService: PassSakayCollectionService
  ) {}

  public category: string = '';
  public passengerStepControls: string = '';
  public busdriverStepControls: string = '';
  public qrPassengerData: any;
  public passengerFormGroup: FormGroup = new FormGroup({});
  public busDriverFormGroup: FormGroup = new FormGroup({});
  public disableBasicInfoNext: Boolean = true;
  public disableContactInfoNext: Boolean = true;

  ngOnInit(): void {
    this.initializePassengerFormGroup();
  }

  initializePassengerFormGroup = () => {
    this.passengerFormGroup = new FormGroup({
      lastname: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      middlename: new FormControl(''),
      gender: new FormControl('', Validators.required),
      birthdate: new FormControl('', Validators.required),
      contactNumber: new FormControl('', Validators.required),
      emailAddress: new FormControl(''),
      currentAddress: new FormControl('', Validators.required),
      homeAddress: new FormControl('', Validators.required),
    });
  };

  handleChangeCategory = (selCategory: string) => {
    this.category = selCategory;
    this.passengerStepControls = '';
    console.log(this.category);
    if (selCategory === '') {
      if (this.passengerFormGroup && this.passengerFormGroup.controls) {
        Object.keys(this.passengerFormGroup.controls).forEach(key => {
          const control = this.passengerFormGroup.get(key);
          if (control) control.setErrors(null);
        });
      }
      this.passengerFormGroup.reset()
    }
  };

  handleNextRegistrationPassenger = (wizardRoute: string) => {
    this.passengerStepControls = wizardRoute ? wizardRoute : '';
  };

  handleNextRegistrationBusDriver = (wizardRoute: string) => {
    this.busdriverStepControls = wizardRoute ? wizardRoute : '';
  };

  handleSubmitPassengerForm = () => {
    console.log('passenger form submitted', this.passengerFormGroup);
    // basic info
    const lastname = this.passengerFormGroup.get('lastname');
    const firstname = this.passengerFormGroup.get('firstname');
    const middlename = this.passengerFormGroup.get('middlename');
    const gender = this.passengerFormGroup.get('gender');
    const birthdate = this.passengerFormGroup.get('birthdate');
    // contact info
    const contactNumber = this.passengerFormGroup.get('contactNumber');
    const emailAddress = this.passengerFormGroup.get('emailAddress');
    const currentAddress = this.passengerFormGroup.get('currentAddress');
    const homeAddress = this.passengerFormGroup.get('homeAddress');

    // prep request body
    const passengerBody = {
      Lastname: lastname && lastname.value ? lastname.value : "",
      Firstname: firstname && firstname.value ? firstname.value : "",
      Middlename: middlename && middlename.value ? middlename.value : "",
      Gender: gender && gender.value ? gender.value : "",
      Birthdate: birthdate && birthdate.value ? birthdate.value : "",
      ActiveContactNumber: contactNumber && contactNumber.value ? contactNumber.value : "",
      ActiveEmailAdd: emailAddress && emailAddress.value ? emailAddress.value : "",
      CurrentAddress: currentAddress && currentAddress.value ? currentAddress.value : "",
      HomeAddress: homeAddress && homeAddress.value ? homeAddress.value : "",
    }

    // call api service
    this.passSakayAPIService.addPassenger(passengerBody)
      .then((response: any) => {
        if (!response) this.snackBarService.open('Registration failed. Check your network.', 'OK');
        if (response && response.passengerData) {
          this.generateQRCode(response.passengerData);
        }
      })
    this.handleChangeCategory('pass-registration-complete');
  };

  generateQRCode = (data: any) => {
    console.log('generating qr code', data);
    this.qrPassengerData = data;
  };

  handleInputErrors = (controlName: string, errName: string) => {
    return this.passengerFormGroup.controls[controlName].hasError(errName);
  };

  handleDownloadQRCode = () => {
    console.log('qr downloaded!');
  };

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    if (this.category === 'passenger' && this.passengerStepControls === '') {
      const lastname = this.passengerFormGroup.get('lastname');
      const firstname = this.passengerFormGroup.get('firstname');
      const middlename = this.passengerFormGroup.get('middlename');
      const gender = this.passengerFormGroup.get('gender');
      const birthdate = this.passengerFormGroup.get('birthdate');

      if (
        (lastname && lastname.value !== "") &&
        (firstname && firstname.value !== "") &&
        (gender && gender.value !== "") &&
        (birthdate && birthdate.value !== "")
      ) {
        this.disableBasicInfoNext = false;
      }
    }

    if (this.category === 'passenger' && this.passengerStepControls === 'passenger-contact') {
      const contactNumber = this.passengerFormGroup.get('contactNumber');
      const emailAddress = this.passengerFormGroup.get('emailAddress');
      const currentAddress = this.passengerFormGroup.get('currentAddress');
      const homeAddress = this.passengerFormGroup.get('homeAddress');

      if (
        (contactNumber && contactNumber.value !== "") &&
        (currentAddress && currentAddress.value !== "") &&
        (homeAddress && homeAddress.value !== "")
      ) {
        this.disableContactInfoNext = false;
      }
    }
  }
}
