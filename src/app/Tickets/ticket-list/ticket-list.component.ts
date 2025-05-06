import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/Services/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
})
export class TicketListComponent implements OnInit {
  tickets: any[] = [];
  selectedTicket: any = null;

  constructor(
    private ticketService: TicketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  // Fetch all tickets from the service
  loadTickets(): void {
    this.ticketService.getTickets().subscribe({
      next: (tickets: any[]) => {
        console.log('Fetched tickets:', tickets);
        this.tickets = tickets;
      },
      error: (err) => {
        console.error('Error loading tickets:', err);
      }
    });
  }

  // View ticket details in Bootstrap modal
  view(ticketNumber: string): void {
    const selected = this.tickets.find(t => t.ticket_number === ticketNumber);
    if (selected) {
      this.selectedTicket = selected;

      // Get modal element and initialize it using Bootstrap Modal class
      const modalElement = document.getElementById('ticketModal');
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);
        modal.show();  // This opens the modal
      }
    }
  }

  // Navigate to the edit page
  edit(ticketNumber: string): void {
    this.router.navigate(['/tickets/edit', ticketNumber]);
  }

  // Delete ticket after confirmation
  delete(ticketNumber: string): void {
    if (confirm('Are you sure you want to delete this ticket?')) {
      this.ticketService.deleteTicket(ticketNumber).subscribe({
        next: () => {
          this.loadTickets(); // Refresh the list after deletion
        },
        error: (err) => {
          console.error('Error deleting ticket:', err);
        }
      });
    }
  }
}
