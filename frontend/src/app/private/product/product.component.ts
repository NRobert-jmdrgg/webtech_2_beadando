import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { HttpClient, HttpContext } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  productId!: string;

  product: Product;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.product = {
      _id: '',
      brand: '',
      name: '',
      category: '',
      price: 0,
    };
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];

      this.http
        .get<Product>(`http://localhost:3000/products/${this.productId}`)
        .subscribe({
          next: (data) => {
            this.product = data;
          },
          error: (error) => console.error(error),
        });
    });
  }
}
