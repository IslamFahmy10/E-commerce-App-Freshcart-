import { FormGroup } from '@angular/forms';
import { Component, OnInit  } from '@angular/core';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  data:any={}
  cartData:any=[]
  cartTotalPrice:number=0
  numberOfCartItems:number=0
  constructor(private _cartServ:CartService,private _toastr:ToastrService){}

ngOnInit(): void {
this.getLoggedCart()
}



getLoggedCart(){
  this._cartServ.loggedCart().subscribe({
next: (res:any) =>{
  this.cartData=res.data.products
  this.cartTotalPrice=res.data.totalCartPrice
  this.numberOfCartItems=res.numOfCartItems
  this.data=res.data
  console.log(this.data);


}})

}
removeItem(id:string){
  this._cartServ.removeItem(id).subscribe({
    next:(resp:any)=>{
      this._cartServ.cartNum.next(resp.numOfCartItems)
    },
    error:()=>{
this._toastr.error('failed to remove item')
    },
    complete:()=>{
this._toastr.success('item removed form your cart','Deleted')
this.getLoggedCart()

    }
  })
}
updateCount(id:string,count:number){

  this._cartServ.updateCount(id,count).subscribe({

    next:(res)=>{


      for( let i=0;  i< this.cartData.length ; i++){

        if (res.data.products[i].count == 0){
          this.removeItem(res.data.products[i].product._id)

        }}
     },
    error:()=>{
      this._toastr.error('error','not added')},
    complete:()=>{

        this.getLoggedCart()
      this._toastr.success('updated', 'new count')

    }
  })

}
}



