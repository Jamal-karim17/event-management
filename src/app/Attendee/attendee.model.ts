export class Attendee {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public phone: string,
    public idCard: string,
    public event_id: number,   // match backend naming
    public eventname?: string // optional, added manually
  ) {}
}
