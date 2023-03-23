import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '@services/auth/auth.service';

export class FormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

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
