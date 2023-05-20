import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import apiKey from 'config';
import { catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { User } from './user.model';
import { reduce } from 'rxjs-compat/operator/reduce';

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
  user = new Subject<User>();

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey.MY_KEY}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handelAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey.MY_KEY}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handelAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
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

  private handelAuth(
    email: string,
    uId: string,
    token: string,
    expiresIn: number
  ) {
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, uId, token, expDate);
    this.user.next(user);
  }
}
