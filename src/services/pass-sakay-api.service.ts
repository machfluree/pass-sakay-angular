import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from 'src/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PassSakayCollectionService {
  constructor(
    private httpClientNoInterceptor: HttpClient
  ) { }

  private httpHeaders: { [key:string]: string } = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  }

  public addPassenger(body: any): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.apiAddPassenger(body).subscribe((data: Object) => {
        resolve(data);
      }),
      (err: any): void => {
        reject(err);
      };
    });
  }
  private apiAddPassenger(body: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders(this.httpHeaders);
    const endpoint = environment.api_base_url + 'passengers';
    return this.httpClientNoInterceptor
      .post(endpoint, body, { headers: headers })
      .pipe(map((data: Object) => {
        return data
      }));
  }

  public updatePassenger(body: any, id: string): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.apiUpdatePassenger(body, id).subscribe((data: Object) => {
        resolve(data);
      }),
      (err: any): void => {
        reject(err);
      };
    });
  }
  private apiUpdatePassenger(body: any, id: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders(this.httpHeaders);
    const endpoint = environment.api_base_url + 'passengers/' + id;
    return this.httpClientNoInterceptor
      .put(endpoint, body, { headers: headers })
      .pipe(map((data: Object) => {
        return data
      }));
  }

  public addBusDriver(body: any): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.apiAddBusDriver(body).subscribe((data: Object) => {
        resolve(data);
      }),
        (err: any): void => {
          reject(err);
        };
    });
  }
  private apiAddBusDriver(body: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders(this.httpHeaders);
    const endpoint = environment.api_base_url + 'bus-drivers';
    return this.httpClientNoInterceptor
      .post(endpoint, body, { headers: headers })
      .pipe(map((data: Object) => data));
  }

  public updateBusAccount(body: any, id: string): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.apiUpdateBusAccount(body, id).subscribe((data: Object) => {
        resolve(data);
      }),
      (err: any): void => {
        reject(err);
      };
    });
  }
  private apiUpdateBusAccount(body: any, id: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders(this.httpHeaders);
    const endpoint = environment.api_base_url + 'bus-drivers/' + id;
    return this.httpClientNoInterceptor
      .put(endpoint, body, { headers: headers })
      .pipe(map((data: Object) => {
        return data
      }));
  }

  public addAccount(body: any): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.apiAddAccount(body).subscribe((data: Object) => {
        resolve(data);
      }),
        (err: any): void => {
          reject(err);
        };
    });
  }
  private apiAddAccount(body: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders(this.httpHeaders);
    const endpoint = environment.api_base_url + 'accounts';
    return this.httpClientNoInterceptor
      .post(endpoint, body, { headers: headers })
      .pipe(map((data: Object) => data));
  }

  public getOnePassengerData(id: any): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.apiGetOnePassengerData(id).subscribe((data: Object) => {
        resolve(data);
      }),
        (err: any): void => {
          reject(err);
        };
    });
  }
  private apiGetOnePassengerData(id: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders(this.httpHeaders);
    const endpoint = environment.api_base_url + 'passengers/' + id.toString();
    return this.httpClientNoInterceptor
      .get(endpoint, { headers: headers })
      .pipe(map((data: Object) => data));
  }

  public getOneBusAccountData(id: any): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.apiGetOneBusAccountData(id).subscribe((data: Object) => {
        resolve(data);
      }),
        (err: any): void => {
          reject(err);
        };
    });
  }
  private apiGetOneBusAccountData(id: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders(this.httpHeaders);
    const endpoint = environment.api_base_url + 'bus-drivers/' + id.toString();
    return this.httpClientNoInterceptor
      .get(endpoint, { headers: headers })
      .pipe(map((data: Object) => data));
  }

  public saveScannedPassengerData(body: any): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.apiSaveScannedPassengerData(body).subscribe((data: Object) => {
        resolve(data);
      }),
      (err: any): void => {
        reject(err);
      };
    });
  }
  private apiSaveScannedPassengerData(body: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders(this.httpHeaders);
    const endpoint = environment.api_base_url + 'scanned-qr/';
    return this.httpClientNoInterceptor
      .post(endpoint, body, { headers: headers })
      .pipe(map((data: Object) => data));
  }

  public getAllPassengerData(): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.apiGetAllPassengerData().subscribe((data: Object) => {
        resolve(data);
      }),
        (err: any): void => {
          reject(err);
        };
    });
  }
  private apiGetAllPassengerData(): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders(this.httpHeaders);
    const endpoint = environment.api_base_url + 'passengers/';
    return this.httpClientNoInterceptor
      .get(endpoint, { headers: headers })
      .pipe(map((data: Object) => data));
  }

  public getAllBusAccountData(): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.apiGetAllBusAccountData().subscribe((data: Object) => {
        resolve(data);
      }),
        (err: any): void => {
          reject(err);
        };
    });
  }
  private apiGetAllBusAccountData(): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders(this.httpHeaders);
    const endpoint = environment.api_base_url + 'bus-drivers/';
    return this.httpClientNoInterceptor
      .get(endpoint, { headers: headers })
      .pipe(map((data: Object) => data));
  }

  public getAllTripScheduleData(): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.apiGetAllTripScheduleData().subscribe((data: Object) => {
        resolve(data);
      }),
        (err: any): void => {
          reject(err);
        };
    });
  }
  private apiGetAllTripScheduleData(): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders(this.httpHeaders);
    const endpoint = environment.api_base_url + 'trip-schedules/';
    return this.httpClientNoInterceptor
      .get(endpoint, { headers: headers })
      .pipe(map((data: Object) => data));
  }

  public getOneTripScheduleData(id: any): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.apiGetOneTripScheduleData(id).subscribe((data: Object) => {
        resolve(data);
      }),
        (err: any): void => {
          reject(err);
        };
    });
  }
  private apiGetOneTripScheduleData(id: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders(this.httpHeaders);
    const endpoint = environment.api_base_url + 'trip-schedules/' + id.toString();
    return this.httpClientNoInterceptor
      .get(endpoint, { headers: headers })
      .pipe(map((data: Object) => data));
  }

  public updateTripSchedule(body: any, id: string): Promise<any> {
    return new Promise<any>((resolve: any, reject: any) => {
      this.apiUpdateTripSchedule(body, id).subscribe((data: Object) => {
        resolve(data);
      }),
      (err: any): void => {
        reject(err);
      };
    });
  }
  private apiUpdateTripSchedule(body: any, id: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders(this.httpHeaders);
    const endpoint = environment.api_base_url + 'trip-schedules/' + id;
    return this.httpClientNoInterceptor
      .put(endpoint, body, { headers: headers })
      .pipe(map((data: Object) => {
        return data
      }));
  }
}
