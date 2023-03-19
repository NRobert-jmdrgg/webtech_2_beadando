import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { AuthGuard } from '../../auth.guard';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  constructor(
    private router: Router,
    private authGuard: AuthGuard,
    private authService: AuthService
  ) {}

  logout() {
    console.log('logout was called');

    this.authService.logout();
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    return this.authGuard.canActivate();
  }

  isLoginPage() {
    return this.router.url === '/login';
  }
}
