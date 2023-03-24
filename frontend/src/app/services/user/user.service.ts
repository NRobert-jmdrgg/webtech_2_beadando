import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface RegisterData {
  email?: string | null;
  name?: string | null;
  phone?: string | null;
  lastName?: string | null;
  firstName?: string | null;
  password?: string | null;
  password2?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  checkDuplicateUser(data: RegisterData) {}

  register(data: RegisterData) {
    const registerRequest = {
      user: data,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<{ message: string }>(
      'http://localhost:3000/users/add/',
      registerRequest,
      {
        headers,
      }
    );
  }
}
