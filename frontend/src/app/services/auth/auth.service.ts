import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '@models/user';

export interface LoginRequest {
  email: string;
  password: number;
}

export interface LoginResponse {
  accessToken: string;
  exiresIn: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User;
  expiresIn!: Date;

  constructor(private http: HttpClient, private jwtService: JwtHelperService) {
    this.user = this.getLoggedInUser();
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>('http://localhost:3000/auth/signin', loginRequest)
      .pipe(
        tap((res: LoginResponse) => {
          localStorage.setItem('accessToken', res.accessToken);
          this.expiresIn = new Date(res.exiresIn);
        })
      );
  }

  logout() {
    localStorage.removeItem('accessToken');
  }

  isAuthenticated() {
    return this.expiresIn && this.expiresIn.getTime() > new Date().getTime();
  }

  getLoggedInUser() {
    const token = localStorage.getItem('accessToken');
    const decodedToken = this.jwtService.decodeToken(token!);
    return decodedToken;
  }
}
