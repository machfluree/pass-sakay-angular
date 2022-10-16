import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { LocalStorageService } from 'src/services/local-storage.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bus-driver',
  templateUrl: './bus-driver.component.html',
  styleUrls: ['./bus-driver.component.scss']
})
export class BusDriverComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.authService.checkAuth(environment.STORAGE_KEY)) {
      this.router.navigate(['login']);
    }
  }

}
