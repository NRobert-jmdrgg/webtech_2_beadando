import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { ProductService } from '@services/product/product.service';

/**
 * @title Binding event handlers and properties to the table rows.
 */
@Component({
  selector: 'app-registry',
  styleUrls: ['registry.component.css'],
  templateUrl: 'registry.component.html',
})
export class RegistryComponent implements OnInit {
  productsLength!: number;
  currentPage: number;
  pageSize: number;

  displayedColumns = ['name', 'brand', 'price', 'registeredBy', 'category'];

  dataSource: Product[];

  constructor(private router: Router, private productService: ProductService) {
    this.dataSource = [];
    this.currentPage = 0;
    this.pageSize = 10;
  }

  onProductClick(id: string) {
    this.router.navigate(['/product', id]);
  }

  loadProducts(event: any) {
    console.log(JSON.stringify(event, null, 2));
    const { pageIndex, pageSize } = event;
    this.productService.getProducts(pageIndex * pageSize, pageSize).subscribe({
      next: (products) => (this.dataSource = products),

      error: (error) => console.error(error),
    });
  }

  ngOnInit() {
    this.productService.getProducts(0, this.pageSize).subscribe({
      next: (products) => (this.dataSource = products),
      error: (error) => console.error(error),
    });

    this.productService.getProductsCount().subscribe({
      next: (products) => (this.productsLength = products.length),
      error: (error) => console.error(error),
    });
  }
}
