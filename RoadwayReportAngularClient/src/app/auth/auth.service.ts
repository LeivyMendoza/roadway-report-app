// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('authToken'); // Or however you choose to store the token
  }

  isLoggedIn(): boolean {
    return this.token != null;
  }
}
