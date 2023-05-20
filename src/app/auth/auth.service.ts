import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import apiKey from 'config';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey.MY_KEY}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey.MY_KEY}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(errRes: HttpErrorResponse) {
    let errMsg = 'An unknown error occurred';
    if (!errRes.error || !errRes.error.error) {
      return throwError(errMsg);
    }
    switch (errRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errMsg = 'This email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errMsg = 'Invalid Login Credentials';
        break;
      case 'INVALID_PASSWORD':
        errMsg = 'Invalid Login Credentials';
        break;
      case 'USER_DISABLED':
        errMsg = 'User has been disabled';
        break;
    }
    return throwError(errMsg);
  }
}
