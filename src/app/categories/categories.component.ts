import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  allCategories: any[] = [];

  constructor(private _allProducts: ProductsService) {}

  ngOnInit(): void {
    this._allProducts.getAllCategories().subscribe({
      next: (res: any) => {
        this.allCategories = res.data;
      },
      error: (err) => console.error(err)
    });
  }
}
