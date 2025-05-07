import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Attendee } from '../Attendee/attendee.model';
import { EventService } from './event.service';
import { Event } from '../Events/event.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AttendeeService {
  private apiUrl = 'http://localhost:3000/api/attendees';

  constructor(
    private http: HttpClient,
    private eventService: EventService,
    private authService: AuthService // Inject AuthService
  ) {}

  // Get all attendees
  getAttendees(): Observable<Attendee[]> {
    return this.http.get<Attendee[]>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      catchError((error) => {
        console.error('Error fetching attendees:', error);
        return throwError(error);  // Rethrow error so it's handled elsewhere
      })
    );
  }

  // Get an attendee by ID
  getAttendeeById(id: number): Observable<Attendee> {
    return this.http.get<Attendee>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError((error) => {
        console.error(`Error fetching attendee with ID ${id}:`, error);
        return throwError(error);
      })
    );
  }

  // Add a new attendee with auto-generated ID, and update event name
  addAttendee(attendee: Attendee): Observable<Attendee> {
    console.log('Adding attendee:', attendee);  // Log the attendee data being sent
    
    attendee.id = Number(attendee.id); // Ensure the ID is a number
    
    return this.http.post<Attendee>(this.apiUrl, attendee, { headers: this.getAuthHeaders() }).pipe(
      catchError((error) => {
        console.error('Error adding attendee:', error);
        return throwError(error);
      })
    );
  }

  // Update an existing attendee, ensure the event name is correct
  updateAttendee(attendee: Attendee): Observable<Attendee> {
    return this.eventService.getEventById(attendee.event_id).pipe(  // Changed to event_id
      switchMap((event: Event | undefined) => {
        attendee.eventname = event?.name || ''; // Update event name
        return this.http.put<Attendee>(`${this.apiUrl}/${attendee.id}`, attendee, { headers: this.getAuthHeaders() }).pipe(
          catchError((error) => {
            console.error(`Error updating attendee with ID ${attendee.id}:`, error);
            return throwError(error);
          })
        );
      }),
      catchError((error) => {
        console.error('Error fetching event for attendee:', error);
        return throwError(error);
      })
    );
  }

  // Delete an attendee by ID
  deleteAttendee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError((error) => {
        console.error(`Error deleting attendee with ID ${id}:`, error);
        return throwError(error);
      })
    );
  }

  // Proxy to EventService for event-related operations
  getEvents(): Observable<Event[]> {
    return this.eventService.getEvents().pipe(
      catchError((error) => {
        console.error('Error fetching events:', error);
        return throwError(error);
      })
    );
  }

  // Get event name by event ID
  getEventNameById(eventId: number): Observable<string> {
    return this.eventService.getEventById(eventId).pipe(
      map((event) => event?.name || ''),
      catchError((error) => {
        console.error(`Error fetching event name for event ID ${eventId}:`, error);
        return throwError(error);
      })
    );
  }

  // Get the Authorization Headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Get token from AuthService
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Include token in the Authorization header
    });
  }
}
