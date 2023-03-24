import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '@services/user/user.service';
import { FormErrorStateMatcher } from '@utils/formatStateMatcher';

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

  matcher = new FormErrorStateMatcher();

  hide = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    this.userService.register(this.registerForm.value).subscribe({
      next: () => {
        this.snackBar.open('Sikeres regisztráció', 'ok', { duration: 3000 });
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
