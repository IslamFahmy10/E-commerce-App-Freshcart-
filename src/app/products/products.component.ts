import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
import { Products } from '../products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  allProducts: Products[] = [];
  currentPage: number = 1;
  numberOfPages: number = 1;
  term: string = '';

  constructor(
    private _allProducts: ProductsService,
    private _cartServ: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProducts(this.currentPage);
  }

  getProducts(page: number) {
    this._allProducts.getAllProducts(page).subscribe({
      next: (res: any) => {
        this.allProducts = res.data;
        this.currentPage = res.metadata.currentPage;
        this.numberOfPages = res.metadata.numberOfPages;
      },
      error: (err) => console.error(err)
    });
  }

  addToMyCart(id: string) {
    this._cartServ.AddToCart(id).subscribe({
      next: (res) => {
        this._cartServ.cartNum.next(res.numOfCartItems);
        this.toastr.success('Item added to your cart', 'ADDED!');
      },
      error: (err) => this.toastr.error(err.error?.message || 'Failed to add item', 'Error')
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.numberOfPages) {
      this.getProducts(page);
    }
  }
}
