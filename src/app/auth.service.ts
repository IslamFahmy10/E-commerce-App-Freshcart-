import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData = new BehaviorSubject<any>(null);

  constructor(private _HttpClient: HttpClient, private _router: Router) {
    const token = localStorage.getItem('userToken');
    if (token) this.decodeUser(token);
  }

  decodeUser(token: string) {
    try {
      const decoded: any = jwtDecode(token);
      this.userData.next(decoded);
      console.log('Decoded User:', decoded);
    } catch (err) {
      console.error('Invalid token:', err);
      this.userData.next(null);
    }
  }

  register(data: FormGroup): Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data.value);
  }

  login(data: FormGroup): Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', data);
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._router.navigate(['/login']);
  }
}
