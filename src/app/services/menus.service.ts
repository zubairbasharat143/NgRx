import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  private baseUrl = 'http://localhost:3005/api/v1/admin';

  constructor(private http: HttpClient) {}

  getMenus() {
    return this.http.get<any>(`${this.baseUrl}/menus`);
  }

  createMenu(payload: any) {
    return this.http.post<any>(`${this.baseUrl}/menus/create`, payload);
  }

  updateMenu(id: number, payload: any) {
    return this.http.put<any>(`${this.baseUrl}/menus/update/${id}`, payload);
  }

  deleteMenu(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/menus/delete/${id}`);
  }

  assignMenu(payload: any) {
    return this.http.post<any>(`${this.baseUrl}/menu/assign`, payload);
  }
}
