import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CreateEventComponent } from './Events/create-event/create-event.component';
import { EventListComponent } from './Events/event-list/event-list.component';
import { RegisterAttendeeComponent } from './Attendee/register-attendee/register-attendee.component';
import { AttendeeListComponent } from './Attendee/attendee-list/attendee-list.component';
import { IssueTicketComponent } from './Tickets/issue-ticket/issue-ticket.component';
import { TicketListComponent } from './Tickets/ticket-list/ticket-list.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './Home/dashboard/dashboard.component';
import { SummaryCardsComponent } from './Home/dashboard/summary-cards/summary-cards.component';

import { UpcomingEventsComponent } from './Home/dashboard/upcoming-events/upcoming-events.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CreateEventComponent,
    EventListComponent,
    RegisterAttendeeComponent,
    AttendeeListComponent,
    IssueTicketComponent,
    TicketListComponent,
    DashboardComponent,
    SummaryCardsComponent,
    
    UpcomingEventsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
