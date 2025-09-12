import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading = false;
  loginError = '';
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][A-Za-z0-9!@#$%^&*()_\-+=.?]{7,15}$/)
    ])
  });

  constructor(private _AuthService: AuthService, private _router: Router) {
    if (localStorage.getItem('userToken') !== null) {
      this._router.navigate(['/home']);
    }
  }

  getData(Data: FormGroup) {
    this.loginError = '';
    this.isLoading = true;
    console.log(Data.value);

    this._AuthService.login(Data.value).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if (res.message === 'success') {
          localStorage.setItem('userToken', res.token);
          this._AuthService.decodeUser(res.token);
          this._router.navigate(['/home']);
        } else {
          this.loginError = res.message;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.loginError = err.error?.message || 'Login failed';
        console.log(err);
      },
      complete: () => console.log('done')
    });
  }

  goToForgotPassword() {
    this._router.navigate(['/account-info']);
  }
}
