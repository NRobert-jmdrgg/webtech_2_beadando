import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
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

  constructor(
    private router: Router,
    private productService: ProductService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    this.authService.currentUser$.subscribe({
      next: (user) => {
        console.log(user);
        this.productService
          .addProduct({
            ...this.productAddForm.value,
            registeredBy: user?.id,
          })
          .subscribe({
            next: () => {
              this.snackBar.open('Termék hozzáadva', 'ok', { duration: 3000 });
              this.router.navigate(['/registry']);
            },
            error: (error) => console.error(error),
          });
      },
      error: (error) => console.error(error),
    });
    this.router.navigate(['/registry']);
  }

  cancel() {
    this.router.navigate(['/registry']);
  }
}
