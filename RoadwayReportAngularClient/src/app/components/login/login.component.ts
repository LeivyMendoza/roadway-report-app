// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onLogin(): void {
    this.loginService.login(this.email, this.password).subscribe(
      data => {
        localStorage.setItem('authToken', data.access); // Use 'access' token for JWT
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Login error', error);
        // Handle login error
      }
    );
  }
}
