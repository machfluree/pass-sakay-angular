import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  public loginFormGroup: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.intializeLoginFormGroup()
  }

  intializeLoginFormGroup = () => {
    this.loginFormGroup = new FormGroup({
      emailUsername: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  onLogin = () => {
    console.log("login data", this.loginFormGroup)
  }

}
