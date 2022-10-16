import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/services/auth.service';
import jwt_decode from "jwt-decode";
import { LocalStorageService } from 'src/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private route: Router,
    public snackBarService: MatSnackBar
  ) {}

  public loginFormGroup: FormGroup = new FormGroup({});
  public disableLoginBtn: Boolean = true;
  public loginFailed: Boolean = false;

  ngOnInit(): void {
    this.intializeLoginFormGroup();
  }

  intializeLoginFormGroup = () => {
    this.loginFormGroup = new FormGroup({
      emailUsername: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  };

  onLogin = () => {
    console.log('login data', this.loginFormGroup);
    this.localStorageService.removeAll();
    const emailUsername = this.loginFormGroup.get('emailUsername');
    const password = this.loginFormGroup.get('password');

    if (emailUsername?.dirty || (emailUsername?.valid && emailUsername.value))
      this.disableLoginBtn = true;
    if (password?.dirty || (password?.valid && password.value))
      this.disableLoginBtn = true;

    const loginBody: Object = {
      EmailUsername: emailUsername?.value || '',
      Password: password?.value || '',
    };
    
    this.authService
      .loginUser(loginBody)
      .then((response) => {
        if (!response) this.openSnackBar("Login failed.", "Retry");
        if (response && response.accessToken) {
          this.localStorageService.set(environment.LOCAL_STORAGE_AUTH_KEY, response);
          const loggedInUser: any = jwt_decode(response.accessToken);
          this.redirectLoggedInUser(JSON.parse(loggedInUser.data));
        }
      });
  };

  redirectLoggedInUser = (userData: any) => {
    console.log('redirecting', userData)
    switch (userData.userRole) {
      case 'bus driver':
        this.route.navigate(['bus-driver']).then(() => {
          this.openSnackBar("Logged in as Bus Driver", "OK");
        });
        break;
      case 'admin':
        this.route.navigate(['/admin/dashboard']).then(() => {
          this.openSnackBar("Logged in as Admin", "OK");
        });
        break;
      default:
        break;
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBarService.open(message, action);  
  }

  ngDoCheck(): void {
    if (this.loginFormGroup.dirty) this.disableLoginBtn = true;

    const emailUsername = this.loginFormGroup.get('emailUsername');
    const password = this.loginFormGroup.get('password');
    if (emailUsername?.value && password?.value) this.disableLoginBtn = false;
  }
}
