import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../Events/event.model';  // Assuming you have an Event model
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000/api/events';

  private lastUsedId: number = 0; // Track the last used ID

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Get all events
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // Get event by ID (ID as number or string)
  getEventById(id: string | number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Add a new event, auto-generate and use a number ID
  addEvent(event: Event): Observable<Event> {
    this.lastUsedId += 1;
    event.id = this.lastUsedId; // Assign a new ID to the event
    return this.http.post<Event>(this.apiUrl, event, { headers: this.getAuthHeaders() });
  }

  // Update an existing event (ID as number or string)
  updateEvent(event: Event): Observable<Event> {
    const eventId = typeof event.id === 'string' ? +event.id : event.id;
    return this.http.put<Event>(
      `${this.apiUrl}/${eventId}`,
      event,
      { headers: this.getAuthHeaders() }
    );
  }

  // Delete an event by ID (ID as number or string)
  deleteEvent(id: string | number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Get the Authorization Headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Get token from AuthService
    if (!token) {
      throw new Error('Authorization token is missing');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Include token in the Authorization header
    });
  }
}
