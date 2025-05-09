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
  styleUrls: ['./register-attendee.component.css']
})
export class RegisterAttendeeComponent implements OnInit {
  events: Event[] = [];
  attendee: Attendee = new Attendee(0, '', '', '', '', 0, '');
  isEditMode: boolean = false;
  showNotification: boolean = false; // To control notification visibility

  constructor(
    private attendeeService: AttendeeService,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
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

    // Ensure event_id is a number
    this.attendee.event_id = +this.attendee.event_id;

    this.eventService.getEventById(this.attendee.event_id).subscribe(
      (selectedEvent) => {
        if (!selectedEvent) return;

        this.attendee.eventname = selectedEvent.name;

        if (this.isEditMode) {
          this.attendeeService.updateAttendee(this.attendee).subscribe(
            () => {
              this.showNotificationMessage();
              this.router.navigate(['/attendees/list']);
            },
            (error) => console.error('Error updating attendee:', error)
          );
        } else {
          const newAttendee = { ...this.attendee };
          delete (newAttendee as any).id;

          this.attendeeService.addAttendee(newAttendee).subscribe(
            () => {
              this.showNotificationMessage();
              this.router.navigate(['/customer']);
            },
            (error) => console.error('Error adding attendee:', error)
          );
        }
      },
      (error) => console.error('Error fetching event details:', error)
    );
  }

  // Method to show the notification message
  showNotificationMessage(): void {
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false; // Hide after 4 seconds
    }, 4000);
  }
}
