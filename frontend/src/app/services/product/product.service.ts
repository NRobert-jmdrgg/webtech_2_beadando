import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(index: number, count: number) {
    return this.http.get<Product[]>(
      `http://localhost:3000/products/lower/${index}/${count}`
    );
  }

  getProductsCount() {
    return this.http.get<{ length: number }>(
      'http://localhost:3000/products/count'
    );
  }
}
