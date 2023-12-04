// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private registerUrl = 'http://localhost:8000/api/register/'; // Your Django registration endpoint

  constructor(private http: HttpClient) {}

  registerUser(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(this.registerUrl, userData);
  }
}
