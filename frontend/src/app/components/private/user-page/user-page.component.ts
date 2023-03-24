import { Component, OnInit } from '@angular/core';
import { User } from '@models/user';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  user!: User | null;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: (user) => (this.user = user),
      error: (error) => console.error(error),
    });
  }
}
