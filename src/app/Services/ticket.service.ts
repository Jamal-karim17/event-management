import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Ticket } from '../Tickets/ticket.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:3000/api/tickets';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Get all tickets
  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Get a ticket by ID (numeric or string ID from URL param)
  getTicketById(ticketNumber: string | number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${ticketNumber}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Get a ticket by ticketNumber field (used in edit mode via route param)
  getTicketByNumber(ticketNumber: string): Observable<Ticket | undefined> {
    return this.getTickets().pipe(
      map((tickets: Ticket[]) =>
        tickets.find(ticket => ticket.ticketNumber === ticketNumber)
      ),
      catchError(this.handleError)
    );
  }

  // Add a new ticket
  addTicket(ticket: Ticket): Observable<Ticket> {
    const ticketPayload = {
      ticket_type: ticket.ticketType,
      attendee_id: ticket.attendeeId,
      event_id: ticket.eventId,
    };

    return this.http.post<Ticket>(this.apiUrl, ticketPayload, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Update an existing ticket
  updateTicket(ticket: Ticket): Observable<Ticket> {
    const ticketPayload = {
      ticket_type: ticket.ticketType,
      attendee_id: ticket.attendeeId,
      event_id: ticket.eventId,
    };

    return this.http.put<Ticket>(
      `${this.apiUrl}/${ticket.ticketNumber}`,
      ticketPayload,
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a ticket by ticket number
  deleteTicket(ticketNumber: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${ticketNumber}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Get the Authorization Headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Get token from AuthService
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Include token in the Authorization header
    });
  }

  // Error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
