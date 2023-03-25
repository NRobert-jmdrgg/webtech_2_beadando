import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@models/user';
import { AuthService } from '@services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit, OnDestroy {
  user!: User | null;
  currentUserSubscription!: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.currentUser$.subscribe({
      next: (user) => (this.user = user),
      error: (error) => console.error(error),
    });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
