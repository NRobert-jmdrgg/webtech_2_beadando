import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@services/product/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '@models/product';
import { FormErrorStateMatcher } from '@utils/formatStateMatcher';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productId!: string;
  edit: boolean;
  action: string;
  initialValues!: Product;
  productModifyForm!: FormGroup;
  matcher = new FormErrorStateMatcher();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.edit = false;
    this.action = 'Szerkeszt';

    this.productModifyForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      brand: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
    });

    this.productModifyForm.disable();
  }

  cancel() {
    this.productModifyForm.reset(this.initialValues);
    this.toggleEditMode();
  }

  toggleEditMode() {
    if (!this.edit) {
      this.action = 'Mentés';
      this.edit = true;
      this.productModifyForm.enable();
    } else {
      this.action = 'Szerkeszt';
      this.edit = false;
      this.productModifyForm.disable();
    }
  }

  onSubmit() {
    this.productService
      .updateProduct({ _id: this.productId, ...this.productModifyForm.value })
      .subscribe({
        next: () => this.router.navigate(['/registry']),
        error: (error) => console.error(JSON.stringify(error, null, 2)),
      });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
    });
    this.productService.getProduct(this.productId).subscribe({
      next: (data) => {
        this.initialValues = data;
        this.productModifyForm.patchValue(data);
      },
      error: (error) => console.error(error),
    });
  }
}
