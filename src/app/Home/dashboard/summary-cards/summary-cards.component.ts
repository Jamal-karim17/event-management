import { Component, Input } from '@angular/core';
import { Event } from 'src/app/Events/event.model';
import { Attendee } from 'src/app/Attendee/attendee.model';
import { Ticket } from 'src/app/Tickets/ticket.model';

@Component({
  selector: 'app-summary-cards',
  templateUrl: './summary-cards.component.html',
  styleUrls: ['./summary-cards.component.css']
})
export class SummaryCardsComponent {
  @Input() events: Event[] = [];
  @Input() attendees: Attendee[] = [];
  @Input() tickets: Ticket[] = [];

  // Calculating the counts based on the length of the arrays
  get eventCount(): number {
    return this.events.length;
  }

  get attendeeCount(): number {
    return this.attendees.length;
  }

  get ticketCount(): number {
    return this.tickets.length;
  }

  // Calculate tickets per event
  getTicketsPerEvent(): string {
    if (this.eventCount === 0) return '0';
    return (this.ticketCount / this.eventCount).toFixed(1);
  }

  // Get the most booked event
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
