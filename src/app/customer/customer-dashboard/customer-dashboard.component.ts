import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/Services/customer.service';
import { Event } from 'src/app/Events/event.model';
import { Attendee } from 'src/app/Attendee/attendee.model';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  upcomingEvents: Event[] = [];
  pastEvents: Event[] = [];
  today = new Date();
  selectedEvent: Event | null = null;
  attendee: Attendee = new Attendee(0, '', '', '', '', 0);

  isRegisterFormVisible = false; // For toggling the registration form

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getPublicEvents().subscribe(events => {
      const now = new Date();
      this.upcomingEvents = events.filter(e => new Date(e.date) >= now);
      this.pastEvents = events.filter(e => new Date(e.date) < now);
    });
  }

  registerAttendee(): void {
    this.attendee.event_id = this.selectedEvent ? this.selectedEvent.id : 0;

    this.customerService.registerAttendee(this.attendee).subscribe(response => {
      console.log('Attendee registered:', response);
      alert('Attendee registered successfully!');
      this.resetAttendeeForm();
      this.toggleRegisterForm(); // Close form after registration
    }, error => {
      console.error('Registration failed:', error);
      alert('Registration failed!');
    });
  }

  resetAttendeeForm(): void {
    this.attendee = new Attendee(0, '', '', '', '', 0);
  }

  openEventDetails(event: Event): void {
    this.selectedEvent = event;
    this.isRegisterFormVisible = true;
  }

  

  toggleRegisterForm(): void {
    this.isRegisterFormVisible = !this.isRegisterFormVisible;
  }
}
