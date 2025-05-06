import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketService } from 'src/app/Services/ticket.service';
import { AttendeeService } from 'src/app/Services/attendee.service';
import { EventService } from 'src/app/Services/event.service';
import { Ticket } from '../ticket.model';
import { Attendee } from 'src/app/Attendee/attendee.model';
import { Event } from 'src/app/Events/event.model';

@Component({
  selector: 'app-issue-ticket',
  templateUrl: './issue-ticket.component.html',
})
export class IssueTicketComponent implements OnInit {
  attendees: Attendee[] = [];
  events: Event[] = [];
  ticket: Ticket = {
    id: 0,
    ticketNumber: '',
    attendeeId: 0,
    attendeeName: '',
    eventId: 0,
    eventName: '',
    eventDate: '',
    ticketType: 'Regular',
  };
  isEditMode: boolean = false;

  constructor(
    private ticketService: TicketService,
    private attendeeService: AttendeeService,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Fetch attendees and events
    this.attendeeService.getAttendees().subscribe(attendees => {
      this.attendees = attendees;
    });

    this.eventService.getEvents().subscribe(events => {
      this.events = events;
    });

    // Check if we are in edit mode based on route parameter
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.ticketService.getTicketById(id).subscribe(existingTicket => {
        if (existingTicket) {
          // Pre-populate ticket details if found
          this.ticket = { ...existingTicket };
          this.ticket.attendeeId = +this.ticket.attendeeId;
          this.ticket.eventId = +this.ticket.eventId;
          this.isEditMode = true;

          // Fetch and set event details for the ticket
          this.eventService.getEventById(this.ticket.eventId).subscribe(
            (event) => {
              if (event) {
                this.ticket.eventName = event.name;
                this.ticket.eventDate = event.date;
              }
            },
            (error) => console.error('Error fetching event:', error)
          );
        }
      });
    }
  }

  // Auto-populate event fields based on selected attendee
  onAttendeeChange(): void {
    const selectedAttendeeId = this.ticket.attendeeId;
    if (!selectedAttendeeId) return;

    this.attendeeService.getAttendeeById(selectedAttendeeId).subscribe(
      (attendee) => {
        if (attendee.event_id) {
          this.ticket.eventId = attendee.event_id;

          this.eventService.getEventById(attendee.event_id).subscribe(
            (event) => {
              if (event) {
                this.ticket.eventName = event.name;
                this.ticket.eventDate = event.date;
              }
            },
            (error) => console.error('Error fetching event:', error)
          );
        }
      },
      (error) => console.error('Error fetching attendee:', error)
    );
  }

  // Submit form to add or update ticket
  onSubmit(form: NgForm): void {
    if (!form.valid) return;

    const attendeeId = this.ticket.attendeeId;
    const eventId = this.ticket.eventId;

    this.attendeeService.getAttendeeById(attendeeId).subscribe(
      (selectedAttendee) => {
        this.eventService.getEventById(eventId).subscribe(
          (selectedEvent) => {
            if (selectedAttendee && selectedEvent) {
              this.ticket.attendeeName = selectedAttendee.name;
              this.ticket.eventName = selectedEvent.name;
              this.ticket.eventDate = selectedEvent.date;

              const newTicket = { ...this.ticket };

              if (!this.isEditMode) {
                // Remove fields that should not be sent when creating a new ticket
                delete newTicket.id;
                delete newTicket.ticketNumber;
              }

              const saveOperation = this.isEditMode
                ? this.ticketService.updateTicket(this.ticket)
                : this.ticketService.addTicket(newTicket);

              saveOperation.subscribe(
                () => this.router.navigate(['/tickets/list']),
                (error) => {
                  console.error(
                    this.isEditMode ? 'Error updating ticket:' : 'Error adding ticket:',
                    error
                  );
                }
              );
            }
          },
          (error) => console.error('Error fetching event details:', error)
        );
      },
      (error) => console.error('Error fetching attendee details:', error)
    );
  }
}
