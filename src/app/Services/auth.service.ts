import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface SignupResponse {
  token: string; // Assuming the signup response has a token, similar to login
  user: any; // Modify this based on the actual user object structure
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api'; // Adjust the base URL

  constructor(private http: HttpClient) {}

  // Signup method - Registers the user and gets a response
  signup(username: string, password: string): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.baseUrl}/signup`, { username, password });
  }

  // Login method - Authenticates the user and gets the JWT token
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password });
  }

  // Store JWT token in localStorage
  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Get JWT token from localStorage
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Remove JWT token from localStorage
  logout(): void {
    localStorage.removeItem('auth_token');
  }

  // Check if the user is logged in (has a valid token)
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  isTokenExpired(token: string): boolean {
    try {
      const payload = this.decodeToken(token);
      const expiry = payload.exp;
      if (!expiry) return false;

      // JWT expiry is in seconds, so multiply by 1000 to convert to milliseconds
      const expiryDate = new Date(expiry * 1000);
      return expiryDate < new Date();
    } catch (e) {
      return true;  // If the token can't be decoded, it's expired or invalid
    }
  }

  // Decode JWT token to get the payload (for expiration validation)
  decodeToken(token: string): any {
    const payload = token.split('.')[1];  // JWT structure: header.payload.signature
    return JSON.parse(atob(payload));
  }
}
