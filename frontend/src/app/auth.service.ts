import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private jwtService: JwtHelperService) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>('http://localhost:3000/auth/signin', loginRequest)
      .pipe(
        tap((res: LoginResponse) =>
          localStorage.setItem('accessToken', res.accessToken)
        )
      );
  }

  isAuthenticated() {
    return !!localStorage.getItem('accessToken');
  }

  getLoggedInUser() {
    const token = localStorage.getItem('accessToken');
    const decodedToken = this.jwtService.decodeToken(token!);
    console.log(JSON.stringify(decodedToken, null, 2));
    return decodedToken;
  }
}
