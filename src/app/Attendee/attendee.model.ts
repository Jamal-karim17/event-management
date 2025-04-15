export class Attendee {
  constructor(
    public id: number = 0,           // ID (default 0, can be auto-generated or updated)
    public fullName: string = '',    // Full name of the attendee
    public email: string = '',       // Email address of the attendee
    public eventId: number = 0,      // ID of the associated event
    public eventName: string = ''    // Name of the associated event
  ) {}
}
