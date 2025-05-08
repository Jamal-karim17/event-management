import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/Services/event.service';
import { Event } from 'src/app/Events/event.model';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  upcomingEvents: Event[] = [];
  pastEvents: Event[] = [];
  today = new Date();

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(events => {
      const now = new Date();
      this.upcomingEvents = events.filter(e => new Date(e.date) >= now);
      this.pastEvents = events.filter(e => new Date(e.date) < now);
    });
  }
}
