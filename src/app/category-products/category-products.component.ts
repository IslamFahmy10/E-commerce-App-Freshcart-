import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Products } from '../products';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss']
})
export class CategoryProductsComponent implements OnInit {
  categoryId!: string;
  products: Products[] = [];
  currentPage: number = 1;
  numberOfPages: number = 1;
  mode: 'category' | 'brand' = 'category'; // default

  constructor(
    private route: ActivatedRoute,
    private _allProducts: ProductsService,
    private _cartServ: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        // Determine mode from URL
        const url = this.route.snapshot.url[0].path; // 'category' or 'brand'
        this.mode = url === 'brand' ? 'brand' : 'category';

        this.categoryId = params.get('id')!;
        this.getCategoryProducts(this.currentPage);
      }
    });
  }

  getCategoryProducts(page: number) {
    if (this.mode === 'brand') {
      this._allProducts.getFilteredProducts({ brand: this.categoryId }, page).subscribe({
        next: (res: any) => {
          this.products = res.data;
          this.currentPage = res.metadata.currentPage;
          this.numberOfPages = res.metadata.numberOfPages;
        },
        error: (err) => console.error(err)
      });
    } else {
      this._allProducts.getProductsByCategory(this.categoryId, page).subscribe({
        next: (res: any) => {
          this.products = res.data;
          this.currentPage = res.metadata.currentPage;
          this.numberOfPages = res.metadata.numberOfPages;
        },
        error: (err) => console.error(err)
      });
    }
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
      this.getCategoryProducts(page);
    }
  }
}
