import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  @Input() loggedIn!: boolean;

  constructor(private router: Router) {}

  isLoginPage() {
    return this.router.url === '/login';
  }
}
