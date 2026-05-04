import { createContext, useContext, useState, type ReactNode } from "react";

interface TicketContextData {
    enrolledTracks: string[];
    enrollInTrack: (trackId: string) => Promise<void>;
    isEnrolled: (trackId: string) => boolean;
}

const TicketContext = createContext<TicketContextData | undefined>(undefined);

type TicketProps = { children: ReactNode };

export function TicketProvider(props: TicketProps) {
    const [enrolledTracks, setEnrolledTracks] = useState<string[]>(() => {
        const stored = localStorage.getItem("@TechPass:enrolledTracks");
        return stored ? JSON.parse(stored) : [];
    });

    const commitTicketsChange = (newTracks: string[]) => {
        localStorage.setItem("@TechPass:enrolledTracks", JSON.stringify(newTracks));
        setEnrolledTracks(newTracks);
    };

    const enrollInTrack = async (trackId: string) => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        if (enrolledTracks.includes(trackId)) return;
        const newTracks = [...enrolledTracks, trackId];
        commitTicketsChange(newTracks);
    };

    const isEnrolled = (trackId: string) => enrolledTracks.includes(trackId);

    return (
        <TicketContext.Provider value={{ enrolledTracks, enrollInTrack, isEnrolled }}>
            {props.children}
        </TicketContext.Provider>
    );
}

export function useTickets() {
    const context = useContext(TicketContext);
    if (!context) throw new Error("useTickets deve ser usado dentro de um TicketProvider");
    return context;
}
