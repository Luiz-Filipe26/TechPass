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
