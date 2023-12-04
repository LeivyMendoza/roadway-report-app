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
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  navigateToRegister(): void {
    this.router.navigate(['/register']); // Update with your actual register route
  }

  onLogin(): void {
    this.loginService.login(this.email, this.password).subscribe(
      data => {
        localStorage.setItem('authToken', data.access); // Use 'access' token for JWT
        this.router.navigate(['/dashboard']);
      },
      error => {
        if (error.error && error.error.error) {
          this.errorMessage = error.error.error;
        } else {
          this.errorMessage = 'An unexpected error occurred. Please check credentials.';
        }
      }
    );
  }
}
