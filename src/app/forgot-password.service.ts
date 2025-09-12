// src/app/services/forgot-password.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private baseUrl = 'https://ecommerce.routemisr.com/api/v1/auth';

  constructor(private http: HttpClient) {}

  // Step 1: Send reset email
  sendResetEmail(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgotPasswords`, { email });
  }

  // Step 2: Verify reset code
  verifyResetCode(resetCode: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/verifyResetCode`, { resetCode });
  }

  // Step 3: Reset password
  resetPassword(email: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/resetPassword`, { email, newPassword });
  }
}
