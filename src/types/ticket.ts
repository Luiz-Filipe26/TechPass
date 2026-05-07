export type TicketCategory = "vip" | "standard" | "general";

export interface Ticket {
    id: string;
    trackId: string;
    trackTitle: string;
    sessionId: string;
    sessionTitle: string;
    seatId: string | null;
    category: TicketCategory;
    purchaseDate: string;
    eventDate: string;
}
