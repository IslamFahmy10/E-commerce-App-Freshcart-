import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  myCartNum:number=0
  isLoggedIn:boolean=false
  constructor(private _auth:AuthService,private _cartServ:CartService){
    _cartServ.cartNum.subscribe({
      next:(val)=>{this.myCartNum=val}
    })
    _auth.userData.subscribe({
      next: ()=>{
        if (_auth.userData.getValue()!=null){
          this.isLoggedIn=true;
}
else{
  this.isLoggedIn=false
}

      }})}
    logOut(){
      this._auth.logOut()
    }}
