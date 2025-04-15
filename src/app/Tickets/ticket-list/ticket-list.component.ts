import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/Services/ticket.service';
import { Ticket } from '../ticket.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  selectedTicket: Ticket | null = null;

  constructor(private ticketService: TicketService, private router: Router) {}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe((tickets) => {
      this.tickets = tickets;
    });
  }

  view(id: number): void {
    this.ticketService.getTicketById(id).subscribe((ticket) => {
      if (ticket) {
        this.selectedTicket = ticket;
        const modalElement = document.getElementById('ticketModal');
        if (modalElement) {
          const modal = new (window as any).bootstrap.Modal(modalElement);
          modal.show();
        }
      }
    });
  }

  edit(id: number): void {
    this.router.navigate(['/tickets/edit', id]);
  }

  delete(id: number): void {
    // Confirm the deletion with the user
    if (confirm('Are you sure you want to delete this ticket?')) {
      // Call the delete service method to delete the ticket
      this.ticketService.deleteTicket(id).subscribe(() => {
        // Fetch the updated list of tickets after deletion
        this.ticketService.getTickets().subscribe((tickets) => {
          // Update the tickets list in the component
          this.tickets = tickets;
        });
      });
    }
  }
  
}
