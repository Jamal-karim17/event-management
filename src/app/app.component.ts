import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Entertainment-x';
  isLoginPage: boolean = false;
  isSignupPage: boolean = false;
  isMainDashboard: boolean = false;
  isContactPage: boolean = false;

  constructor(private router: Router) {
    // Check the current route after each navigation ends
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentUrl = this.router.url;
      this.isLoginPage = currentUrl === '/login';
      this.isSignupPage = currentUrl.includes('/signup');
      this.isMainDashboard = currentUrl === '/customer';
      this.isContactPage = currentUrl === '/contact';
    });
  }
}
