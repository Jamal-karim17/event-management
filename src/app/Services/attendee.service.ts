import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Attendee } from '../Attendee/attendee.model';
import { EventService } from './event.service';
import { Event } from '../Events/event.model';

@Injectable({
  providedIn: 'root',
})
export class AttendeeService {
  private apiUrl = 'http://localhost:3000/attendees';

  constructor(private http: HttpClient, private eventService: EventService) {}

  // Get all attendees
  getAttendees(): Observable<Attendee[]> {
    return this.http.get<Attendee[]>(this.apiUrl);
  }

  // Get an attendee by ID
  getAttendeeById(id: number): Observable<Attendee> {
    return this.http.get<Attendee>(`${this.apiUrl}/${id}`);
  }

  // Add a new attendee with auto-generated ID, and update event name
  addAttendee(attendee: Attendee): Observable<Attendee> {
    // Ensure that the ID is treated as a number
    attendee.id = Number(attendee.id); // Convert ID to number, just in case
  
    return this.http.post<Attendee>(this.apiUrl, attendee); // The backend should auto-assign an ID
  }
  
  // Update an existing attendee, and update event name
  updateAttendee(attendee: Attendee): Observable<Attendee> {
    return this.eventService.getEventById(attendee.eventId).pipe(
      switchMap((event: Event | undefined) => {
        attendee.eventName = event?.name || ''; // Assign event name from the event service
        return this.http.put<Attendee>(`${this.apiUrl}/${attendee.id}`, attendee);
      })
    );
  }

  // Delete an attendee by ID
  deleteAttendee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Proxy to eventService for dropdowns, etc.
  getEvents(): Observable<Event[]> {
    return this.eventService.getEvents();
  }

  // Get event name by event ID
  getEventNameById(eventId: number): Observable<string> {
    return this.eventService.getEventById(eventId).pipe(
      map((event) => event?.name || '')
    );
  }
}
