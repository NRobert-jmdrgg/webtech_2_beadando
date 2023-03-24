import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  addProduct(product: {
    name?: string | null;
    brand?: string | null;
    price?: number | null;
    category?: string | null;
    registeredBy?: string;
  }) {
    return this.http.post<{ message: string }>(
      `http://localhost:3000/products/add`,
      {
        product: product,
      }
    );
  }

  updateProduct(product: Product) {
    return this.http.put<{ message: string }>(
      `http://localhost:3000/products/${product._id}`,
      {
        product: {
          name: product.name ?? undefined,
          brand: product.brand ?? undefined,
          price: product.price ?? undefined,
          category: product.category ?? undefined,
        },
      }
    );
  }

  getProduct(id: string) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

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
