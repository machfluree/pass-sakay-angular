import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LocalStorageService } from 'src/services/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Login } from 'src/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClientNoInterceptor: HttpClient;
  public hasError: Boolean = false;

  constructor(
    private httpBackend: HttpBackend,
    public localStorageService: LocalStorageService,
    private snackBar: MatSnackBar
  ) {
    this.httpClientNoInterceptor = new HttpClient(httpBackend);
  }

  public checkAuth(data: any): Boolean {
    if (this.localStorageService.get(data)) return true;
    return false;
  }

  public async loginUser(body: any): Promise<any> {
    try {
      return await new Promise<any>((resolve: any, reject: any) => {
        this.apiLoginUser(body).subscribe((data: Object) => {
          console.log('1234', data);
          resolve(data);
        }),
          (error: any) => {
            reject(error);
          };
      });
    } catch (error) {
      return error;
    }
  }

  private apiLoginUser(body: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    });
    const endpoint = 'http://localhost:4300/pass-sakay-v1/api/auth/login';
    return this.httpClientNoInterceptor
      .post(endpoint, body, { headers: headers })
      .pipe(
        map((data: Object) => data),
        catchError(async (err) => console.log('http-error', err))
      );
  }
}
