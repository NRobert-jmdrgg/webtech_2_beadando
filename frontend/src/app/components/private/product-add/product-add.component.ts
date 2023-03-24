import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '@services/product/product.service';
import { FormErrorStateMatcher } from '@utils/formatStateMatcher';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent {
  productAddForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    brand: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
  });
  matcher = new FormErrorStateMatcher();

  constructor(private router: Router, private productService: ProductService) {}

  onSubmit() {
    this.productService.addProduct(this.productAddForm.value).subscribe({
      next: (res) => console.log(res),
      error: (error) => console.error(error),
    });
    this.router.navigate(['/registry']);
  }

  cancel() {
    this.router.navigate(['/registry']);
  }
}
