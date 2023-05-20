import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  loginMode = true;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) return;
    const email = authForm.value.email;
    const password = authForm.value.password;

    if (this.loginMode) {
    } else {
      this.authService.signUp(email, password).subscribe(
        (resData) => {
          console.log(resData);
        },
        (errData) => {
          console.log(errData);
        }
      );
    }

    authForm.reset();
  }
}
