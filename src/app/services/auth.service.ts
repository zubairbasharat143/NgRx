import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../store/models/user.model';

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

  createUser(userData: any, token: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, userData, {
      headers: { 'x-access-token': `JWT ${token}` },
    });
  }

  getAllUsers(): Observable<{ data: User[] }> {
    const token = sessionStorage.getItem('token');
    return this.http.get<{ data: User[] }>(`${this.baseUrl}/getADusers`, {
      headers: { 'x-access-token': `JWT ${token}` || '' },
    });
  }
}
