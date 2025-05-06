import { Component, OnInit } from '@angular/core';
import { AttendeeService } from 'src/app/Services/attendee.service';
import { EventService } from 'src/app/Services/event.service';
import { Attendee } from '../attendee.model';
import { Event } from 'src/app/Events/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendee-list',
  templateUrl: './attendee-list.component.html',
})
export class AttendeeListComponent implements OnInit {
  attendees: Attendee[] = [];
  selectedAttendee: Attendee | null = null;
  events: Event[] = [];

  constructor(
    private attendeeService: AttendeeService,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAttendees();
  }

  loadAttendees(): void {
    this.eventService.getEvents().subscribe((events) => {
      this.events = events;
      console.log('Loaded Events:', this.events);

      this.attendeeService.getAttendees().subscribe((data) => {
        console.log('Loaded Attendees:', data);

        this.attendees = data.map((attendee) => {
          // Ensure 'eventId' is being used correctly here
          const matchedEvent = this.events.find(
            (event) => event.id === attendee.event_id  // Make sure it's event_id, not eventId
          );
          console.log(`Matching event for attendee ${attendee.name}:`, matchedEvent);

          return {
            ...attendee,
            eventname: matchedEvent ? matchedEvent.name : 'N/A'
          };
        });
      });
    });
  }

  view(id: number): void {
    this.attendeeService.getAttendeeById(id).subscribe((attendee) => {
      // Again, make sure 'event_id' is used here
      const matchedEvent = this.events.find(
        (event) => event.id === attendee.event_id  // Make sure it's event_id, not eventId
      );
      this.selectedAttendee = {
        ...attendee,
        eventname: matchedEvent ? matchedEvent.name : 'N/A'
      };

      const modalElement = document.getElementById('attendeeViewModal');
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);
        modal.show();
      }
    });
  }

  edit(id: number): void {
    this.attendeeService.getAttendeeById(id).subscribe((attendee) => {
      if (attendee) {
        this.router.navigate(['/attendees/edit', id], {
          state: { attendee },
        });
      }
    });
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this attendee?')) {
      this.attendeeService.deleteAttendee(id).subscribe(() => {
        this.loadAttendees();
      });
    }
  }
}
