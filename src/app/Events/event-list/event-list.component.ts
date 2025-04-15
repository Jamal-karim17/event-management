import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/Services/event.service';
import { Event } from '../event.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  selectedEvent: Event | null = null;

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
    });
  }

  // View event: convert id to number if necessary
  view(id: number): void {
    this.eventService.getEventById(id).subscribe((event) => {
      if (event) {
        this.selectedEvent = event;

        // Show Bootstrap modal manually
        const modal = new (window as any).bootstrap.Modal(
          document.getElementById('eventViewModal')
        );
        modal.show();
      }
    });
  }

  // Edit event: pass id as a number
  edit(id: number): void {
    this.router.navigate(['/events/edit', id]);
  }

  // Delete event: pass id as a number and use number comparison
  delete(id: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id).subscribe(() => {
        this.events = this.events.filter(event => event.id !== id); // Filter events by number id
      });
    }
  }
}
