import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Add this import
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private router: Router) {} // Inject Router here

  onLogin(): void {
    this.loginService.login(this.email, this.password).subscribe(
      data => {
        console.log('Login success', data);
        // Redirect to dashboard on successful login
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Login error', error);
        // Handle login error
        // Optionally show an error message to the user
      }
    );
  }
}
