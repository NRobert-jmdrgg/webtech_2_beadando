import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '@models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@services/product/product.service';
import { Subscription } from 'rxjs';

/**
 * @title Binding event handlers and properties to the table rows.
 */
@Component({
  selector: 'app-registry',
  styleUrls: ['registry.component.css'],
  templateUrl: 'registry.component.html',
})
export class RegistryComponent implements OnInit, OnDestroy {
  productsLength!: number;
  currentPage: number;
  pageSize: number;
  displayedColumns = ['name', 'brand', 'price', 'registeredBy', 'category'];
  dataSource: Product[];
  getProductsSubscription!: Subscription;
  getProductsSubscription2!: Subscription;
  queryParamSubscription!: Subscription;
  getProductsCountSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.dataSource = [];
    this.currentPage = 0;
    this.pageSize = 10;
  }

  onProductClick(id: string) {
    this.router.navigate(['/product', id]);
  }

  setUrlQueryParams(index: string, size: string) {
    this.router.navigateByUrl(`/registry?page=${index}&size=${size}`);
  }

  loadProducts(event: any) {
    const { pageIndex, pageSize } = event;
    this.getProductsSubscription = this.productService
      .getProducts(pageIndex * pageSize, pageSize)
      .subscribe({
        next: (products) => (this.dataSource = products),
        error: (error) => console.error(error),
      });

    this.setUrlQueryParams(pageIndex, pageSize);
  }

  ngOnInit() {
    this.queryParamSubscription = this.route.queryParams.subscribe((params) => {
      this.currentPage = params['page'] ?? 0;
      this.pageSize = params['size'] ?? 10;
    });

    this.getProductsSubscription2 = this.productService
      .getProducts(0, this.pageSize)
      .subscribe({
        next: (products) => (this.dataSource = products),
        error: (error) => console.error(error),
      });

    this.getProductsCountSubscription = this.productService
      .getProductsCount()
      .subscribe({
        next: (products) => (this.productsLength = products.length),
        error: (error) => console.error(error),
      });
  }

  ngOnDestroy(): void {
    console.log('registry destroyed');
    if (this.getProductsSubscription) {
      this.getProductsSubscription.unsubscribe();
    }

    this.getProductsSubscription2.unsubscribe();
    this.queryParamSubscription.unsubscribe();
    this.getProductsCountSubscription.unsubscribe();
  }
}
