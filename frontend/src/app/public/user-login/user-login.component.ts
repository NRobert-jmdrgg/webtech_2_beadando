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
import { AuthService } from '../../auth.service';

export class LoginErrorStateMatcher implements ErrorStateMatcher {
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
  matcher = new LoginErrorStateMatcher();

  hide = true;

  submitted = false;

  loggedInUser = this.authService.getLoggedInUser();

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.submitted = true;

    this.authService
      .login(this.loginForm.value)
      .pipe(
        // route to protected/dashboard, if login was successfull
        tap(() => this.router.navigate(['/']))
      )
      .subscribe();

    // console.log(JSON.stringify(this.authService.getLoggedInUser(), null, 2));
  }
}
