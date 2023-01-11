import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import * as moment from 'moment';
import { LocalStorageService } from 'src/services/local-storage.service';
import { PassSakayCollectionService } from 'src/services/pass-sakay-api.service';
import { AdminComponent } from '../admin.component';

@Component({
  selector: 'app-bus-driver-trip-history',
  templateUrl: './trip-history.component.html',
  styleUrls: ['./trip-history.component.scss'],
})
export class TripHistoryComponent implements OnInit {
  @ViewChild('content') content!:ElementRef;  
  public breakpoint: number = 0;

  public tripHistoryList: Array<any> = [];

  constructor(
    private localStorageService: LocalStorageService,
    private route: Router,
    private snackBarService: MatSnackBar,
    private passSakayAPIService: PassSakayCollectionService,
    private adminData: AdminComponent
  ) {}

  ngOnInit() {
    this.getAllTripHistory();
  }

  // /scanned-qr/trip-history/:passenger_id

  getAllTripHistory = () => {
    console.log(this.adminData.userData);
    this.passSakayAPIService
      .getAllTripHistoryData()
      .then((data: any) => {
        data.forEach((tripHistory: any, index: number) => {
          this.tripHistoryList.push({
            _id: tripHistory._id,
            Date: moment(tripHistory.date).format('MMM DD YYYY'),
            Time: moment(tripHistory.time).format('HH:mm:ss A'),
            rowId: index + 1,
            BusName: `${tripHistory.busAccount.busName}`,
            ScanType: tripHistory.tripType,
            TripSched: `
              ${tripHistory.tripSched.name} 
              (${tripHistory.tripSched.startTime} - ${tripHistory.tripSched.endTime})
            `,
            TripRoute: `
              ${tripHistory.tripSched.startingPoint} - 
              ${tripHistory.tripSched.finishingPoint}
            `,
          });
        });
      })
      .catch((error: any) => {
        console.log(error);
        this.snackBarService.open(
          'Failed to load trip history data. Check your internet connection.',
          'Got it'
        );
      });
  };

  save(): void {  
    console.log("sdafahdsfka")
    let content=this.content.nativeElement;  
    let doc: any = new jsPDF('p','mm','a4');  
    let _elementHandlers =  
    {  
      '#editor':function(element: any, renderer: any){  
        return true;  
      }  
    };  
    doc.html(content.innerHTML, {  
      'x': 15,
      'y': 15,
      'width':190,  
      'elementHandlers':_elementHandlers  
    });  
  
    doc.save('test.pdf');  
  }  
}
