import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ForgotPasswordService } from 'src/app/forgot-password.service';


@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent {
  user = { email: 'demo@example.com', username: 'DemoUser' };

  resetEmail = '';
  resetCode = '';
  newPassword = '';

  codeSent = false;
  codeVerified = false;

  constructor(
    private toastr: ToastrService,
    private forgotPasswordService: ForgotPasswordService
  ) {}

  // Step 1: request reset code
  requestResetCode() {
    if (!this.resetEmail.trim()) {
      this.toastr.warning('Please enter your email');
      return;
    }

    this.forgotPasswordService.sendResetEmail(this.resetEmail).subscribe({
      next: () => {
        this.codeSent = true;
        this.toastr.success('Reset code sent! Check your email.');
      },
      error: (err) => {
        this.toastr.error(err.error.message || 'Failed to send reset code');
      }
    });
  }

  // Step 2: verify reset code
  verifyAndUpdatePassword() {
    if (!this.resetCode.trim()) {
      this.toastr.warning('Please enter the verification code');
      return;
    }

    this.forgotPasswordService.verifyResetCode(this.resetCode).subscribe({
      next: () => {
        this.codeVerified = true;
        this.toastr.success('Code verified! Now you can set a new password.');
        this.updatePassword();
      },
      error: (err) => {
        this.toastr.error(err.error.message || 'Invalid verification code');
      }
    });
  }

  // Step 3: reset password
  private updatePassword() {
    if (!this.newPassword.trim()) {
      this.toastr.warning('Please enter a new password');
      return;
    }

    this.forgotPasswordService.resetPassword(this.resetEmail, this.newPassword).subscribe({
      next: () => {
        this.toastr.success('Password updated successfully!');
        this.resetCode = '';
        this.newPassword = '';
        this.codeSent = false;
        this.codeVerified = false;
      },
      error: (err) => {
        this.toastr.error(err.error.message || 'Failed to update password');
      }
    });
  }
}
