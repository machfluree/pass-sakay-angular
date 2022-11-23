import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public breakpoint: number = 0;

  constructor() { }

  ngOnInit() {
    this.initLayout();
  }

  onResize(event: any) {
    // this.breakpoint = (event.target.innerWidth <= 900) ? 2 : 4;
    if (event.target.innerWidth < 576 ) {
      this.breakpoint = 1
    }
    if (event.target.innerWidth >= 576 && event.target.innerWidth <= 768) {
      this.breakpoint = 1
    }
    if (event.target.innerWidth >= 768 && event.target.innerWidth <= 992) {
      this.breakpoint = 2
    }
    if (event.target.innerWidth >= 992 && event.target.innerWidth <= 1200) {
      this.breakpoint = 4
    }
    if (event.target.innerWidth >= 1200 && event.target.innerWidth <= 1400) {
      this.breakpoint = 4
    }
  }

  initLayout() {
    if (window.innerWidth < 576 ) {
      this.breakpoint = 1
    }
    if (window.innerWidth >= 576 && window.innerWidth <= 768) {
      this.breakpoint = 1
    }
    if (window.innerWidth >= 768 && window.innerWidth <= 992) {
      this.breakpoint = 2
    }
    if (window.innerWidth >= 992 && window.innerWidth <= 1200) {
      this.breakpoint = 4
    }
    if (window.innerWidth >= 1200 && window.innerWidth <= 1400) {
      this.breakpoint = 4
    }
  }
}
