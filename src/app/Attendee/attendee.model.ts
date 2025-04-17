export class Attendee {
  constructor(
    public id: number = 0,           
    public fullName: string = '',    
    public email: string = '',       
    public eventId: number = 0,     
    public eventName: string = '' //npx json-server --watch db.json --port 3000

   
  ) {}
}
