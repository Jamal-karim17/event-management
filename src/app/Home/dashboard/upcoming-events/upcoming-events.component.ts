import { Component, Input } from '@angular/core';
import { Event } from 'src/app/Events/event.model';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.css']
})
export class UpcomingEventsComponent {
  @Input() upcomingEvents: Event[] = [];
}
