import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/Services/event.service';
import { Event } from '../event.model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
})
export class CreateEventComponent implements OnInit {
  event: Event = {
    id: 0,
    name: '',
    location: '',
    date: '',
    capacity: 0,
  };

  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Edit mode: Fetch the existing event using id as a string
      this.eventService.getEventById(id).subscribe((existingEvent) => {
        if (existingEvent) {
          this.event = { ...existingEvent }; // Populate form with existing data
          this.isEditMode = true; // Set to true to trigger update logic
        }
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      // Update the existing event (PUT request)
      this.eventService.updateEvent(this.event).subscribe(
        () => {
          this.router.navigate(['/eventlist']); // Redirect after success
        },
        (error) => {
          console.error('Error updating event:', error); // Error handling
        }
      );
    } else {
      // Add a new event (POST request)
      this.eventService.addEvent(this.event).subscribe(
        () => {
          this.router.navigate(['/eventlist']); // Redirect after success
        },
        (error) => {
          console.error('Error adding event:', error); // Error handling
        }
      );
    }
  }
}
