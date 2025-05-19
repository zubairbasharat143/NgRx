import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  private baseUrl = 'http://localhost:3005/api/v1/admin';

  constructor(private http: HttpClient) {}

  getMenus() {
    const token = sessionStorage.getItem('token');
    return this.http.get<any>(`${this.baseUrl}/menus`, {
      headers: { 'x-access-token': `JWT ${token}` || '' },
    });
  }

  createMenu(payload: any) {
    const token = sessionStorage.getItem('token');
    return this.http.post<any>(`${this.baseUrl}/menus/create`, payload, {
      headers: { 'x-access-token': `JWT ${token}` || '' },
    });
  }

  deleteMenu(id: number) {
    const token = sessionStorage.getItem('token');
    return this.http.delete<any>(`${this.baseUrl}/menus/delete/${id}`, {
      headers: { 'x-access-token': `JWT ${token}` || '' },
    });
  }
}
