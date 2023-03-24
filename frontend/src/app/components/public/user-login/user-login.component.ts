import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { FormErrorStateMatcher } from '@utils/formatStateMatcher';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: [],
})
export class UserLoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });
  matcher = new FormErrorStateMatcher();

  hide = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.snackBar.open('Sikeres bejelentkezés', 'ok', { duration: 3000 });
        this.router.navigate(['/']);
      },
      error: (error) => {
        const code = error.status;
        if (code !== 500) {
          this.snackBar.open(error.error.message, 'ok', { duration: 3000 });
        }
      },
    });
  }
}
