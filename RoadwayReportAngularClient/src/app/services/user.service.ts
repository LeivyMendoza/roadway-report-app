import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api'; // Base URL for your Django API

  constructor(private http: HttpClient) {}

  // Existing method to register users
  registerUser(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, userData);
  }

  // New method to get a list of users (for admin)
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/manage/`);
  }

  // New method to add a user (for admin)
  addUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/manage/`, userData);
  }

  // New method to delete a user (for admin)
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/delete/${userId}`);
  }

  isAdmin(): Observable<{is_official: boolean}> {
    return this.http.get<{is_official: boolean}>(`${this.apiUrl}/check_if_official/`);
  }
}
