import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-final';
  isLoginPage: boolean = false;
  isSignupPage: boolean = false;

  constructor(private router: Router) {
    // Check the current route after each navigation ends
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Set `isLoginPage` to true if the route is '/login'
      this.isLoginPage = this.router.url === '/login';
      this.isSignupPage = this.router.url.includes('/signup');
    });
  }
}
