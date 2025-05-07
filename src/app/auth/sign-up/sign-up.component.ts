import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service'; // Adjust the path as needed
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;  // Track loading state

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Clear any previous messages
    this.errorMessage = '';
    this.successMessage = '';

    // Ensure password and confirm password match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // Check if username or password is empty
    if (!this.username || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    // Basic password validation (e.g., length, strength)
    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long';
      return;
    }

    // Start loading state
    this.isLoading = true;

    // Call AuthService signup method
    this.authService.signup(this.username, this.password).subscribe(
      (response) => {
        // On success, redirect to the login page
        this.successMessage = 'Signup successful. Please log in.';
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      (error) => {
        // Handle errors from the backend
        this.isLoading = false;
        if (error.status === 400) {
          this.errorMessage = 'User already exists. Please choose another username.';
        } else {
          this.errorMessage = 'Signup failed. Please try again.';
        }
      }
    );
  }
}
