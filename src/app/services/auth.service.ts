import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3005/api/v1/admin/users';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post<any>(`${this.baseUrl}/login-ad`, payload);
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token; // true if token exists
  }
}
