import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@services/product/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '@models/product';
import { FormErrorStateMatcher } from '@utils/formatStateMatcher';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  productId!: string;
  product!: Product;
  edit: boolean;
  action: string;
  productModifyForm!: FormGroup;
  matcher = new FormErrorStateMatcher();
  currentUserId!: string | undefined | null;
  paramsSubscription!: Subscription;
  productSubscription!: Subscription;
  currentUserSubscription!: Subscription;
  updateProductSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private authService: AuthService
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

  isOwner() {
    return this.product && this.product.registeredBy === this.currentUserId;
  }

  onDelete() {
    this.productService.deleteProduct(this.productId).subscribe({
      next: () => {
        this.snackBar.open('Termék törölve', 'ok', { duration: 3000 });
        this.router.navigate(['/registry']);
      },
      error: (error) => console.error(error),
    });
  }

  cancel() {
    this.productModifyForm.reset(this.product);
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
    this.updateProductSubscription = this.productService
      .updateProduct({ _id: this.productId, ...this.productModifyForm.value })
      .subscribe({
        next: () => {
          this.snackBar.open('Termék frissítve', 'ok', { duration: 3000 });
          this.router.navigate(['/registry']);
        },
        error: (error) => console.error(JSON.stringify(error, null, 2)),
      });
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe((params) => {
      this.productId = params['id'];
    });
    this.productSubscription = this.productService
      .getProduct(this.productId)
      .subscribe({
        next: (data) => {
          this.product = data;
          this.productModifyForm.patchValue(data);
        },
        error: (error) => console.error(error),
      });

    this.currentUserSubscription = this.authService.currentUser$.subscribe({
      next: (user) => (this.currentUserId = user?.id),
      error: (error) => console.error(error),
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    this.productSubscription.unsubscribe();
    this.currentUserSubscription.unsubscribe();

    this.updateProductSubscription?.unsubscribe();
  }
}
