import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent {
  cartId:string=''
  shippingAddress=new FormGroup({
    details:new FormControl(null),
    city: new FormControl(null),
    phone: new  FormControl(null)
  })
constructor(private _cartServ:CartService,private _activaedRoute:ActivatedRoute){
  this.cartId=this._activaedRoute.snapshot.params['x']
}

  payNow(data:FormGroup){
this._cartServ.userPay(this.cartId,data.value).subscribe({
  next:(res)=>{
    window.location.href=res.session.url
  }
  })

  }


}
