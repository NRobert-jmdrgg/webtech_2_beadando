import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginErrorStateMatcher as RegistrationErrorSateMatcher } from '../user-login/user-login.component';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('password2')?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: [],
})
export class UserRegisterComponent {
  registerForm: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, []),
      lastName: new FormControl(null, []),
      firstName: new FormControl(null, []),
      password: new FormControl(null, [Validators.minLength(8)]),
      password2: new FormControl(null, [Validators.required]),
    },
    { validators: passwordMatchValidator }
  );

  matcher = new RegistrationErrorSateMatcher();

  hide = false;

  constructor(private router: Router) {}

  onSubmit() {
    const registerRequest = {
      user: {
        email: this.registerForm.value.email,
        name: this.registerForm.value.name,
        password: this.registerForm.value.password,
        phone: this.registerForm.value.phone,
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
      },
    };

    console.log(JSON.stringify(registerRequest, null, 2));

    fetch('http://localhost:3000/users/add/', {
      method: 'POST',
      body: JSON.stringify(registerRequest),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        this.router.navigate(['/']);
      })
      .catch((error) => console.error(error));
  }
}
