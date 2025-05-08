import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from 'src/app/Events/event.model';
import { Attendee } from '../Attendee/attendee.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000/api/events';        // Public GET for events
  private attendeeUrl = 'http://localhost:3000/api/attendees'; // Public POST for attendees

  constructor(private http: HttpClient) {}

  getPublicEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  registerAttendee(attendee: Attendee): Observable<any> {
    return this.http.post<any>(this.attendeeUrl, attendee);
  }
}
