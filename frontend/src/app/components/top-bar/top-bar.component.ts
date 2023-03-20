import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    console.log('logout was called');

    this.authService.logout();
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  isLoginPage() {
    return this.router.url === '/login';
  }
}
