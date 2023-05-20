import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http.post<AuthResData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyAQo9_-bWsVd-1JfFHcsDg0AnTsDTfUyhA',
      { email: email, password: password, returnSecureToken: true }
    );
  }
}
