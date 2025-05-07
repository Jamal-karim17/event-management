import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service'; // Adjust the path as needed

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menus: { events: boolean; attendees: boolean; tickets: boolean } = {
    events: false,
    attendees: false,
    tickets: false,
  };

  constructor(private authService: AuthService, private router: Router) {}

  // Toggle menu visibility
  toggleMenu(menu: keyof typeof this.menus) {
    this.menus[menu] = !this.menus[menu];
  }


  logout() {

    localStorage.removeItem('authToken'); 

   
    this.router.navigate(['/login']);
  }
}
