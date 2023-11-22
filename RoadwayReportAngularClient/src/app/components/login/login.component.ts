// login.component.ts
import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private loginService: LoginService) {}

  onLogin(): void {
    this.loginService.login(this.email, this.password).subscribe(
      data => {
        console.log('Login success', data);
        // Handle login success
      },
      error => {
        console.error('Login error', error);
        // Handle login error
      }
    );
  }
}
