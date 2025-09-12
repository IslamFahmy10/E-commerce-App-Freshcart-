import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user = { username: '' };
  cartItems = 5;
  purchases = 12; 
  feedback = '';

  constructor(private toastr: ToastrService, private _auth: AuthService) {}

  ngOnInit(): void {
    this._auth.userData.subscribe(user => {
      if (user) {
        this.user.username = user.name || user.username || user.email || 'User';
      }
    });
  }

  submitFeedback() {
    if (this.feedback.trim() === '') {
      this.toastr.warning('Feedback cannot be empty');
      return;
    }
    // Call API if exists
    this.toastr.success('Thank you for your feedback!');
    this.feedback = '';
  }
}
