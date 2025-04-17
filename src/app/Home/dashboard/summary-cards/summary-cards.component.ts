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
}
