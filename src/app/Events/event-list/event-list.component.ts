import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/Services/event.service';
import { Event } from '../event.model';
import { TicketService } from 'src/app/Services/ticket.service';
import { Ticket } from 'src/app/Tickets/ticket.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  selectedEvent: Event | null = null;
  tickets: Ticket[] = [];

  constructor(
    private eventService: EventService,
    private ticketService: TicketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;

      // After loading events, load tickets
      this.ticketService.getTickets().subscribe((tickets) => {
        this.tickets = tickets;
      });
    });
  }

  // Get number of tickets booked for a specific event by event name
  getTicketCount(eventName: string): number {
    return this.tickets.filter(t => t.eventName === eventName).length;
  }

  view(id: number): void {
    this.eventService.getEventById(id).subscribe((event) => {
      if (event) {
        this.selectedEvent = event;

        const modal = new (window as any).bootstrap.Modal(
          document.getElementById('eventViewModal')
        );
        modal.show();
      }
    });
  }

  edit(id: number): void {
    this.router.navigate(['/events/edit', id]);
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id).subscribe(() => {
        this.events = this.events.filter(event => event.id !== id);
      });
    }
  }
}
