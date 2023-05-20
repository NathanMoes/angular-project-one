import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  loginMode = true;
  loading = false;
  errorMsg: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) return;
    const email = authForm.value.email;
    const password = authForm.value.password;
    this.loading = true;

    let authObs: Observable<AuthResData>;

    if (this.loginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.loading = false;
        this.router.navigate(['/recipes']);
      },
      (errData) => {
        console.log(errData);
        this.loading = false;
        this.errorMsg = errData;
      }
    );

    authForm.reset();
  }

  onHandelError() {
    this.errorMsg = null;
  }
}
