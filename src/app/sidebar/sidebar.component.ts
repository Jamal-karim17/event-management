import { Component } from '@angular/core';

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

  toggleMenu(menu: keyof typeof this.menus) {
    this.menus[menu] = !this.menus[menu];
  }
}
