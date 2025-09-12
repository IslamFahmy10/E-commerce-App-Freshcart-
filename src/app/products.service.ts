import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from './products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = 'https://ecommerce.routemisr.com/api/v1';

  constructor(private _HttpClient: HttpClient) {}

  // ✅ Products
  getAllProducts(page: number = 1): Observable<any> {
  return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`);
}


  getProduct(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/products/${id}`);
  }

  // ✅ Categories
  getAllCategories(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/categories`);
  }

  getCategory(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/categories/${id}`);
  }
  getProductsByCategory(categoryId: string, page: number = 1): Observable<any> {
  return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}&page=${page}`);
}
getAllBrands(page: number = 1) {
  return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands?page=${page}`);
}
getFilteredProducts(filter: any = {}, page: number = 1) {
  let query = `?page=${page}`;
  if(filter.category) query += `&category=${filter.category}`;
  if(filter.brand) query += `&brand=${filter.brand}`;
  return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products${query}`);
}


}
