import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AttendeeService } from 'src/app/Services/attendee.service';
import { Attendee } from '../attendee.model';
import { EventService } from 'src/app/Services/event.service';
import { Event } from 'src/app/Events/event.model';

@Component({
  selector: 'app-register-attendee',
  templateUrl: './register-attendee.component.html',
})
export class RegisterAttendeeComponent implements OnInit {
  events: Event[] = []; // List of events for the dropdown
  attendee: Attendee = new Attendee(0, '', '', 0, ''); // Initializing ID with 0 (but it will be updated)
  isEditMode: boolean = false;

  constructor(
    private attendeeService: AttendeeService,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Load events for the dropdown
    this.attendeeService.getEvents().subscribe((data) => {
      this.events = data;
    });

    // Check if an attendee id is present in the route (for editing)
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam; // Convert string ID to number
      this.attendeeService.getAttendeeById(id).subscribe((existingAttendee) => {
        if (existingAttendee) {
          this.attendee = { ...existingAttendee };
          this.isEditMode = true;
        }
      });
    }
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) return;
  
    this.attendee.eventId = +this.attendee.eventId;
  
    this.eventService.getEventById(this.attendee.eventId).subscribe(
      (selectedEvent) => {
        if (!selectedEvent) return;
  
        this.attendee.eventName = selectedEvent.name;
  
        if (this.isEditMode) {
          // Edit mode: PUT request
          this.attendeeService.updateAttendee(this.attendee).subscribe(
            () => {
              this.router.navigate(['/attendees/list']);
            },
            (error) => {
              console.error('Error updating attendee:', error);
            }
          );
        } else {
          // Add mode: POST request
          const newAttendee = { ...this.attendee };
          delete (newAttendee as any).id;
  
          this.attendeeService.addAttendee(newAttendee).subscribe(
            () => {
              this.router.navigate(['/attendees/list']);
            },
            (error) => {
              console.error('Error adding attendee:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error fetching event details:', error);
      }
    );
  }
  

}  
  

