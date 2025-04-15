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
    attendeeId: 0,  // Change to number for consistency
    attendeeName: '',
    eventId: 0,     // Change to number for consistency
    eventName: '',
    eventDate: '',
    tickettype: ''
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
    // Load attendees and events for the dropdowns
    this.attendeeService.getAttendees().subscribe(attendees => {
      this.attendees = attendees;
    });

    this.eventService.getEvents().subscribe(events => {
      this.events = events;
    });

    // Check for an existing ticket id (edit mode)
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;  // Convert idParam to a number
      this.ticketService.getTicketById(id).subscribe(existingTicket => {
        if (existingTicket) {
          this.ticket = { ...existingTicket };
          // Ensure the IDs are numbers when retrieved
          this.ticket.attendeeId = +this.ticket.attendeeId; 
          this.ticket.eventId = +this.ticket.eventId; 
          this.isEditMode = true;
        }
      });
    }
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) return;
  
    const attendeeId = this.ticket.attendeeId;
    const eventId = this.ticket.eventId;
  
    this.attendeeService.getAttendeeById(attendeeId).subscribe(
      (selectedAttendee) => {
        this.eventService.getEventById(eventId).subscribe(
          (selectedEvent) => {
            if (selectedAttendee && selectedEvent) {
              this.ticket.attendeeName = selectedAttendee.fullName;
              this.ticket.eventName = selectedEvent.name;
              this.ticket.eventDate = selectedEvent.date;
  
              if (this.isEditMode) {
                // Update existing ticket (PUT request)
                this.ticketService.updateTicket(this.ticket).subscribe(
                  () => {
                    this.router.navigate(['/tickets/list']);
                  },
                  (error) => {
                    console.error('Error updating ticket:', error);
                  }
                );
              } else {
                // Add new ticket (POST request)
                const newTicket = { ...this.ticket };
                delete (newTicket as any).id;
  
                this.ticketService.addTicket(newTicket).subscribe(
                  () => {
                    this.router.navigate(['/tickets/list']);
                  },
                  (error) => {
                    console.error('Error adding ticket:', error);
                  }
                );
              }
            }
          },
          (error) => {
            console.error('Error fetching event details:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching attendee details:', error);
      }
    );
  }
}  