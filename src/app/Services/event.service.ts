import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../Events/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://localhost:3000/events';

  private lastUsedId: number = 0; // Track the last used ID

  constructor(private http: HttpClient) {}

  // Get all events
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl);
  }

  // Get event by ID (ID as number)
  getEventById(id: number | string): Observable<Event> {
    const eventId = typeof id === 'string' ? +id : id; 
    return this.http.get<Event>(`${this.baseUrl}/${eventId}`);
  }

  // Add a new event, auto-generate and use a number ID
  addEvent(event: Event): Observable<Event> {
   
    this.lastUsedId += 1; 
    event.id = this.lastUsedId; 
    // Proceed to send the event with the generated ID
    return this.http.post<Event>(this.baseUrl, event);
  }

  // Update an existing event (ID as number)
  updateEvent(event: Event): Observable<Event> {
    const eventId = typeof event.id === 'string' ? +event.id : event.id; 
    return this.http.put<Event>(`${this.baseUrl}/${eventId}`, event);
  }

  // Delete an event by ID (ID as number)
  deleteEvent(id: number | string): Observable<any> {
    const eventId = typeof id === 'string' ? +id : id; 
    return this.http.delete(`${this.baseUrl}/${eventId}`);
  }
}
