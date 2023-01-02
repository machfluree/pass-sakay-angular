import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { LocalStorageService } from 'src/services/local-storage.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  sideNavOpened: boolean = true;
  userData: any = {};

  constructor(
    public authService: AuthService,
    public localStorageService: LocalStorageService,
    private router: Router,
    private snackbarService: MatSnackBar,
  ) { }


  ngOnInit(): void {
    // const loginData = this.authService.checkAuth(environment.STORAGE_KEY).data;
    // const parsedLoginData = JSON.parse(loginData);
    // if (parsedLoginData && parsedLoginData.userRole == environment.USER_ROLE.Admin) {
    //   this.userData = parsedLoginData;
    // } else {
    //   this.router.navigate(['/welcome/login']);
    // }
    // console.log(this.userData);
  }

  sideNavToggler = () => {
    this.sideNavOpened = !this.sideNavOpened;
  }

}
