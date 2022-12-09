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
        console.log("uam", data)
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
}
