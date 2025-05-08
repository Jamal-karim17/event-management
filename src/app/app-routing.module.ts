import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventComponent } from './Events/create-event/create-event.component';
import { EventListComponent } from './Events/event-list/event-list.component';
import { AttendeeListComponent } from './Attendee/attendee-list/attendee-list.component';
import { RegisterAttendeeComponent } from './Attendee/register-attendee/register-attendee.component';
import { IssueTicketComponent } from './Tickets/issue-ticket/issue-ticket.component';
import { TicketListComponent } from './Tickets/ticket-list/ticket-list.component';
import { DashboardComponent } from './Home/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';

const routes: Routes = [
  { path: 'createevent', component: CreateEventComponent},
  { path: 'eventlist', component: EventListComponent},
  { path: 'events/edit/:id', component: CreateEventComponent },

  { path: 'attendees/list', component: AttendeeListComponent },
{ path: 'attendees/create', component: RegisterAttendeeComponent },
{ path: 'attendees/edit/:id', component: RegisterAttendeeComponent },

{ path: 'tickets/issue', component: IssueTicketComponent },
{ path: 'tickets/edit/:ticketNumber', component: IssueTicketComponent },
  { path: 'tickets/list', component: TicketListComponent },

  { path: 'login', component: LoginComponent },
  {path: 'signup', component: SignUpComponent},

  { path: 'customer', component: CustomerDashboardComponent},

  {path: 'home', component: DashboardComponent},
  { path: '', redirectTo: 'customer', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
