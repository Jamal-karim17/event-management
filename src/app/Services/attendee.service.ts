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
    
    attendee.id = Number(attendee.id); 
  
    return this.http.post<Attendee>(this.apiUrl, attendee); 
  }
  
  
  updateAttendee(attendee: Attendee): Observable<Attendee> {
    return this.eventService.getEventById(attendee.eventId).pipe(
      switchMap((event: Event | undefined) => {
        attendee.eventName = event?.name || ''; 
        return this.http.put<Attendee>(`${this.apiUrl}/${attendee.id}`, attendee);
      })
    );
  }

  // Delete an attendee by ID
  deleteAttendee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Proxy to eventService for dropdowns
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
