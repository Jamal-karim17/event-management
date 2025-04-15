import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../Tickets/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:3000/tickets';

  constructor(private http: HttpClient) {}

  // Generate a random 16-digit ticket number
  generateTicketNumber(): string {
    return Math.floor(Math.random() * 1e16).toString().padStart(16, '0');
  }

  // Get all tickets
  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl);
  }

  // Get a ticket by ID (ensure the ID is passed as a string)
  getTicketById(id: string | number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${String(id)}`); 
  }

  // Add a new ticket
  addTicket(ticket: Ticket): Observable<Ticket> {
    const newTicket = {
      ...ticket,
      ticketNumber: this.generateTicketNumber()
    };
    return this.http.post<Ticket>(this.apiUrl, newTicket);
  }

  // Update a ticket (ensure the ID is passed as a string)
  updateTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/${String(ticket.id)}`, ticket); // Convert to string
  }

  // Delete a ticket by ID (ensure the ID is passed as a string)
  deleteTicket(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${String(id)}`); 
  }
}
