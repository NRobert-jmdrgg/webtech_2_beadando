import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigate(['/']),
      error: (error) => console.error(error),
    });
  }
}
