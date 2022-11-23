import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { LocalStorageService } from 'src/services/local-storage.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bus-driver',
  templateUrl: './bus-driver.component.html',
  styleUrls: ['./bus-driver.component.scss']
})
export class BusDriverComponent implements OnInit {

  sideNavOpened: boolean = true;

  constructor(
    public authService: AuthService,
    public localStorageService: LocalStorageService,
    private router: Router,
    private snackbarService: MatSnackBar,
  ) { }


  ngOnInit(): void {
    if (!this.authService.checkAuth(environment.STORAGE_KEY)) {
      this.router.navigate(['/welcome/login']).then(() => {
        this.snackbarService.open('Please login first.', 'OK')
      });
    }
  }

  sideNavToggler = () => {
    this.sideNavOpened = !this.sideNavOpened;
  }

}
