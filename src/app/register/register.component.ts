import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  public category: string = "";
  public passengerStepControls: string = "";
  public busdriverStepControls: string = "";
  public qrPassengerData: any;
  public passengerFormGroup: FormGroup = new FormGroup({});
  public busDriverFormGroup: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initializePassengerFormGroup()
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
  }

  handleChangeCategory = (selCategory: string) => {
     this.category = selCategory;
     this.passengerStepControls = "";
     console.log(this.category)
  }

  handleNextRegistrationPassenger = (wizardRoute: string) => {
    this.passengerStepControls = wizardRoute ? wizardRoute : "";
  }

  handleNextRegistrationBusDriver = (wizardRoute: string) => {
    this.busdriverStepControls = wizardRoute ? wizardRoute : "";
  }

  handleSubmitPassengerForm = () => {
    console.log('passenger form submitted', this.passengerFormGroup)
    // save to db
    // if success -> generateQRCode
    this.handleChangeCategory('pass-registration-complete')
    const formData = { name: 'sample', birthdate: Date.now(), age: 32 }
    this.generateQRCode(formData)
  }

  generateQRCode = (data: any) => {
    console.log("generating qr code", data)
    this.qrPassengerData = JSON.stringify(data)
  }

}
