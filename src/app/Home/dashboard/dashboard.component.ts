import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/Services/event.service';
import { AttendeeService } from 'src/app/Services/attendee.service';
import { TicketService } from 'src/app/Services/ticket.service';
import { Event } from 'src/app/Events/event.model';
import { Attendee } from 'src/app/Attendee/attendee.model';
import { Ticket } from 'src/app/Tickets/ticket.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  eventCount = 0;
  attendeeCount = 0;
  ticketCount = 0;
  today: Date = new Date();

  constructor(
    private eventService: EventService,
    private attendeeService: AttendeeService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.loadCounts();
  }

  loadCounts(): void {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      this.eventCount = events.length;
    });

    this.attendeeService.getAttendees().subscribe((attendees: Attendee[]) => {
      this.attendeeCount = attendees.length;
    });

    this.ticketService.getTickets().subscribe((tickets: Ticket[]) => {
      this.ticketCount = tickets.length;
    });
  }
}
