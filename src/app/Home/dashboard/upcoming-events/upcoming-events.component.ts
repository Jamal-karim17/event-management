import { Component, Input } from '@angular/core';
import { Event } from 'src/app/Events/event.model';
import { EventService } from 'src/app/Services/event.service';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.css']
})
export class UpcomingEventsComponent {
  @Input() upcomingEvents: Event[] = [];
  selectedEvent: Event | null = null;

  constructor(private eventService: EventService) {}

  // Method to handle event click and display the modal
  view(id: number): void {
    this.eventService.getEventById(id).subscribe((event) => {
      if (event) {
        this.selectedEvent = event;

        // Open the modal using Bootstrap's modal API
        const modal = new (window as any).bootstrap.Modal(
          document.getElementById('eventViewModal')
        );
        modal.show();
      }
    });
  }
}
