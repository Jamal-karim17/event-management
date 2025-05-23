export interface Ticket {
  id?: number; // Optional for update operations
  ticketNumber?: string; // Auto-generated by the backend
  ticketType: "Regular" | "VIP" | "VVIP";
  attendeeId: number;
  eventId: number;
  attendeeName: string;
  eventName: string;
  eventDate: string;
}
