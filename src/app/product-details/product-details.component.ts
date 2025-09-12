import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';





@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  productId:string=''

constructor(private _ProductServes:ProductsService,private _activated:ActivatedRoute){
this.productId=this._activated.snapshot.params['id']
this.getDetails()
}
product:any=[]

getDetails(){
  this._ProductServes.getProduct(this.productId).subscribe({
    next: (res:any)=>{
      console.log(res.data);
      this.product=res.data

    }
  })
}
customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  autoplay:true,
  autoplayTimeout:1500,
  autoplayHoverPause:true,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
      
    }
  },
  nav: false
}
}

