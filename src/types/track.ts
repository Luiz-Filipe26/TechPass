export interface Session {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    format: "talk" | "workshop" | "demo";
    level: "beginner" | "intermediate" | "advanced";
    capacity: number;
    reserved: number;
    isKeynote?: boolean;
}

export interface Track {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    mainSpeaker: string;
    auditorium: {
        location: string;
        capacity: number;
        reserved: number;
    };
    sessions: Session[];
}

export interface Ticket {
    id: string;
    trackId: string;
    trackTitle: string;
    seatId: string | null;
    category: "vip" | "standard" | "general";
    purchaseDate: string;
    eventDate: string;
}
