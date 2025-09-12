import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  brands: any[] = [];
  currentPage: number = 1;
  numberOfPages: number = 1;


  constructor(private _allProducts: ProductsService) {}
  ngOnInit(): void {
    this.getBrands(this.currentPage);
  }

  getBrands(page: number) {
    this._allProducts.getAllBrands(page).subscribe((res: any) => {
      this.brands = res.data;
      this.numberOfPages = res.metadata.numberOfPages;
      this.currentPage = res.metadata.currentPage;
    });
  }

  goToPage(page: number) {
    if(page < 1 || page > this.numberOfPages) return;
    this.getBrands(page);
  }
}
