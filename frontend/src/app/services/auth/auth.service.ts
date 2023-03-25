import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '@models/user';
import { catchError } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: number;
}

export interface LoginResponse {
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = localStorage.getItem('accessToken');
  private currentUserSubject = new BehaviorSubject<User | null>(
    this.getLoggedInUser()
  );
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private jwtService: JwtHelperService) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`http://localhost:3000/auth/signin`, loginRequest)
      .pipe(
        tap((res: LoginResponse) => {
          this.setAccessToken(res.accessToken);
          this.token = res.accessToken;
          this.currentUserSubject.next(this.getLoggedInUser());
        }),
        catchError((err) => {
          console.error(err);
          throw err;
        })
      );
  }

  private setAccessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.token = null;
    this.currentUserSubject.next(null);
  }

  getToken() {
    return this.token;
  }

  isLoggedIn() {
    return Boolean(this.token);
  }

  private getLoggedInUser() {
    const decodedToken = this.jwtService.decodeToken(this.token!) as User;
    return decodedToken;
  }
}
