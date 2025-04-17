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

  events: Event[] = [];
  attendees: Attendee[] = [];
  tickets: Ticket[] = [];
  upcomingEvents: Event[] = [];

  constructor(
    private eventService: EventService,
    private attendeeService: AttendeeService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.loadCountsAndUpcomingEvents();
  }

  loadCountsAndUpcomingEvents(): void {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      this.events = events;
      this.eventCount = events.length;

      this.upcomingEvents = events
        .filter(event => new Date(event.date) > new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 3);
    });

    this.attendeeService.getAttendees().subscribe((attendees: Attendee[]) => {
      this.attendees = attendees;
      this.attendeeCount = attendees.length;
    });

    this.ticketService.getTickets().subscribe((tickets: Ticket[]) => {
      this.tickets = tickets;
      this.ticketCount = tickets.length;
    });
  }

  getTicketsPerEvent(): string {
    if (this.eventCount === 0) return '0';
    return (this.ticketCount / this.eventCount).toFixed(1);
  }

  getMostBookedEvent(): string {
    if (!this.tickets.length || !this.events.length) return 'N/A';

    const counts: { [eventName: string]: number } = {};

    this.tickets.forEach(ticket => {
      const event = this.events.find(e => e.id === ticket.eventId);
      const eventName = event?.name || 'Unknown';
      counts[eventName] = (counts[eventName] || 0) + 1;
    });

    const mostBooked = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    return mostBooked ? `${mostBooked[0]} (${mostBooked[1]})` : 'N/A';
  }
}
