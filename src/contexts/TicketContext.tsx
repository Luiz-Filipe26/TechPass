import { createContext, useContext, useState, type ReactNode } from "react";
import type { Ticket } from "../types/track";

interface TicketContextData {
    tickets: Ticket[];
    addTicket: (ticket: Ticket) => void;
    isEnrolled: (trackId: string) => boolean;
}

const TicketContext = createContext<TicketContextData | undefined>(undefined);

export function TicketProvider({ children }: { children: ReactNode }) {
    const [tickets, setTickets] = useState<Ticket[]>(() => {
        const stored = localStorage.getItem("@TechPass:tickets");
        return stored ? JSON.parse(stored) : [];
    });

    const commitTicketsChange = (newTickets: Ticket[]) => {
        localStorage.setItem("@TechPass:tickets", JSON.stringify(newTickets));
        setTickets(newTickets);
    };

    const addTicket = (ticket: Ticket) => {
        if (tickets.some((t) => t.trackId === ticket.trackId)) return;
        commitTicketsChange([...tickets, ticket]);
    };

    const isEnrolled = (trackId: string) => tickets.some((t) => t.trackId === trackId);

    return (
        <TicketContext.Provider value={{ tickets, addTicket, isEnrolled }}>
            {children}
        </TicketContext.Provider>
    );
}

export function useTickets() {
    const context = useContext(TicketContext);
    if (!context) throw new Error("useTickets deve ser usado dentro de um TicketProvider");
    return context;
}
