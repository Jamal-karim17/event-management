import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { EventService } from 'src/app/Services/event.service';
import { AttendeeService } from 'src/app/Services/attendee.service';
import { TicketService } from 'src/app/Services/ticket.service';
import { Event } from 'src/app/Events/event.model';
import { Attendee } from 'src/app/Attendee/attendee.model';
import { Ticket } from 'src/app/Tickets/ticket.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  eventCount = 0;
  attendeeCount = 0;
  ticketCount = 0;
  today: Date = new Date();

  events: Event[] = [];
  attendees: Attendee[] = [];
  tickets: Ticket[] = [];
  upcomingEvents: Event[] = [];

  barChartLabels: string[] = [];
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Events per Month',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };
  barChartType: ChartType = 'bar';

  pieChartLabels: string[] = [];
  pieChartData: number[] = [];
  pieChartType: ChartType = 'pie';

  pieChartOptions: ChartOptions = {
    responsive: true
  };

  barChartOptions: ChartOptions = {
    responsive: true
  };

  constructor(
    private eventService: EventService,
    private attendeeService: AttendeeService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.loadCountsAndCharts();
  }

  loadCountsAndCharts(): void {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      this.events = events;
      this.eventCount = events.length;

      const eventCounts: Record<string, number> = {};
      events.forEach(event => {
        const month = new Date(event.date).toLocaleString('default', { month: 'short' });
        eventCounts[month] = (eventCounts[month] || 0) + 1;
      });
      this.barChartLabels = Object.keys(eventCounts);
      this.barChartData.datasets[0].data = Object.values(eventCounts);

      this.upcomingEvents = events
        .filter(event => new Date(event.date) > new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 3);
    });

    this.attendeeService.getAttendees().subscribe((attendees: Attendee[]) => {
      this.attendees = attendees;
      this.attendeeCount = attendees.length;
    });

    this.ticketService.getTickets().subscribe((tickets: Ticket[]) => {
      this.tickets = tickets;
      this.ticketCount = tickets.length;

      const typeCounts: Record<string, number> = {};
      tickets.forEach(ticket => {
        const type = (ticket as any).type || 'Unknown';
        typeCounts[type] = (typeCounts[type] || 0) + 1;
      });
      this.pieChartLabels = Object.keys(typeCounts);
      this.pieChartData = Object.values(typeCounts);
    });
  }
}
