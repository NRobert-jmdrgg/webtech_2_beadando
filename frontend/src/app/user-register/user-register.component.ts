import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginErrorStateMatcher } from '../user-login/user-login.component';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: [],
})
export class UserRegisterComponent {
  userRegisterData = {
    name: '',
    password: '',
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
  };

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [Validators.required]);

  userNameFormControl = new FormControl('', [Validators.required]);

  matcher = new LoginErrorStateMatcher();

  hide = false;
}
