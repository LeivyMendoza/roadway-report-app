// register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  cpassword: string = '';
  driver_license_number: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onRegister(): void {
    const userData = { email: this.email, driver_license_number: this.driver_license_number, password: this.password };
    this.userService.registerUser(userData).subscribe(
      data => {
        console.log('Registration successful', data);
        this.router.navigate(['/login']); // Redirect to login after successful registration
      },
      error => {
        this.errorMessage = error.error.error || 'Registration failed. Please try again.';
      }
    );
  }
}
