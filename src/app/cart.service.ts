import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartNum = new BehaviorSubject(0);
  Url: string = 'https://ecommerce.routemisr.com/api/v1/';

  constructor(private _HttpClient: HttpClient) {
    this.loggedCart().subscribe({
      next: (res: any) => { this.cartNum.next(res.numOfCartItems); },
      error: (err) => console.log('Cart init error:', err)
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  AddToCart(id: string): Observable<any> {
    return this._HttpClient.post(
      `${this.Url}cart`,
      { productId: id },
      { headers: this.getAuthHeaders() }
    );
  }

  loggedCart(): Observable<any> {
    return this._HttpClient.get(
      `${this.Url}cart`,
      { headers: this.getAuthHeaders() }
    );
  }

  removeItem(id: string): Observable<any> {
    return this._HttpClient.delete(
      `${this.Url}cart/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  updateCount(id: string, count: number): Observable<any> {
    return this._HttpClient.put(
      `${this.Url}cart/${id}`,
      { count: `${count}` },
      { headers: this.getAuthHeaders() }
    );
  }

  userPay(cartId: string, data: FormGroup): Observable<any> {
    return this._HttpClient.post(
      `${this.Url}orders/checkout-session/${cartId}?url=http://localhost:4200`,
      data.value,
      { headers: this.getAuthHeaders() }
    );
  }
}
