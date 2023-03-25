import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnDestroy {
  currentUserSubcription!: Subscription;
  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  logout() {
    this.authService.logout();
    this.snackBar.open('Sikeresen kijelentkezve', 'ok', { duration: 3000 });
    this.router.navigate(['/']);
  }

  goToUserPage() {
    this.currentUserSubcription = this.authService.currentUser$.subscribe({
      next: (user) => this.router.navigate([`/user/${user?.id}`]),
      error: (error) => console.error(error),
    });
  }

  atPage(route: string) {
    return route === this.router.routerState.snapshot.url.split('?')[0];
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  ngOnDestroy(): void {
    this.currentUserSubcription?.unsubscribe();
  }
}
