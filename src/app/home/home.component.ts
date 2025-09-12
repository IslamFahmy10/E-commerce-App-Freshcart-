import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Products } from '../products';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
 import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  term: string = '';
  allProducts: Products[] = [];
  allCategories: any[] = [];
categoriesOptions: any = {
  loop: true,
  autoplay: true,
  autoplayTimeout: 2000,
  autoplayHoverPause: true,
  dots: false,
  nav: false,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  responsive: {
    0: { items: 2 },
    576: { items: 3 },
    768: { items: 4 },
    992: { items: 5 },
    1200: { items: 6 }
  }
}
homeSliderOption:OwlOptions = {
  loop: true,
  autoplay: true,
  autoplayHoverPause:false,
  dots: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
 items:1
};

  constructor(
    private _allProducts: ProductsService,
    private _cartServ: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  // get products
  this._allProducts.getAllProducts().subscribe({
    next: (res: any) => {
      this.allProducts = res.data;
    }
  });

  // get categories
  this._allProducts.getAllCategories().subscribe({
    next: (res: any) => {
      this.allCategories = res.data;
      console.log('Categories:', this.allCategories);
    }
  });
}

  addToMyCart(id: string) {
    this._cartServ.AddToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._cartServ.cartNum.next(res.numOfCartItems);
        this.toastr.success('Item added to your cart', 'ADDED!');
      },
      error: (err) => {
        console.log("Cart error:", err);
        this.toastr.error(err.error?.message || 'Failed to add item', 'Error');
      }
    });
  }
}
