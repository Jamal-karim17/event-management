import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service'; // Adjust the path as needed
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  passwordVisible: boolean = false; // Added this for toggling password visibility

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        // Assuming the response has a token
        const token = response.token; // Extract the token from the response
        if (token) {
          // Store the token in localStorage
          this.authService.saveToken(token);

          // Redirect to the dashboard after login
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Authentication failed. Please try again.';
        }
      },
      error => {
        this.errorMessage = 'Invalid username or password'; // Show error message if login fails
      }
    );
  }

  togglePasswordVisibility() {
    // Toggle the password visibility (true or false)
    this.passwordVisible = !this.passwordVisible;
  }
}
