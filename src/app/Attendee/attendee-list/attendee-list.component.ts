import { Component, OnInit } from '@angular/core';
import { AttendeeService } from 'src/app/Services/attendee.service';
import { Attendee } from '../attendee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendee-list',
  templateUrl: './attendee-list.component.html',
})
export class AttendeeListComponent implements OnInit {
  attendees: Attendee[] = [];
  selectedAttendee: Attendee | null = null; // For modal display

  constructor(
    private attendeeService: AttendeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAttendees();
  }

  loadAttendees(): void {
    this.attendeeService.getAttendees().subscribe((data) => {
      this.attendees = data;
    });
  }

  view(id: number): void {
    this.attendeeService.getAttendeeById(id).subscribe((attendee) => {
      this.selectedAttendee = attendee;
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
        this.loadAttendees(); // Refresh list after deletion
      });
    }
  }
  
}
