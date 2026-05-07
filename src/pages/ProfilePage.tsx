import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { LogOut, Calendar, MapPin, Ticket as TicketIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTickets } from "@/contexts/TicketContext";
import type { Ticket, TicketCategory } from "@/types/ticket";

const categoryStyles: Record<TicketCategory, string> = {
    vip: "bg-amber-100 text-amber-700",
    standard: "bg-cobalt-100 text-cobalt-700",
    general: "bg-emerald-100 text-emerald-700",
};

export function ProfilePage() {
    const { user, logout } = useAuth();
    const { tickets } = useTickets();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/login", { state: { from: "/profile" } });
    }, [user, navigate]);

    if (!user) return null;

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const nowTime = new Date().getTime();

    const upcoming = tickets
        .filter((t) => new Date(t.eventDate).getTime() >= nowTime)
        .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());

    const past = tickets
        .filter((t) => new Date(t.eventDate).getTime() < nowTime)
        .sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <ProfileHeader user={user} onLogout={handleLogout} />

            <main className="max-w-5xl mx-auto px-4 py-12">
                <section className="mb-12">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-cobalt-600" /> Próximos Eventos
                    </h2>

                    {upcoming.length === 0 ? (
                        <EmptyTicketsState />
                    ) : (
                        <div className="grid gap-6">
                            {upcoming.map((ticket) => (
                                <TicketItem key={ticket.id} ticket={ticket} />
                            ))}
                        </div>
                    )}
                </section>

                {past.length > 0 && (
                    <section className="opacity-60">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">Encerrados</h2>
                        <div className="grid gap-6">
                            {past.map((ticket) => (
                                <TicketItem key={ticket.id} ticket={ticket} isPast />
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

function ProfileHeader({ user, onLogout }: { user: any; onLogout: () => void }) {
    return (
        <div className="bg-white border-b border-gray-200 pt-12 pb-8">
            <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-cobalt-100 rounded-full flex items-center justify-center text-cobalt-600 text-2xl font-black uppercase">
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Olá, {user.name}</h1>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded-xl transition-colors"
                >
                    <LogOut className="w-5 h-5" /> Sair
                </button>
            </div>
        </div>
    );
}

function TicketItem({ ticket, isPast }: { ticket: Ticket; isPast?: boolean }) {
    const badgeStyle = categoryStyles[ticket.category];

    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
            <div className="p-8 flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${badgeStyle}`}
                    >
                        {ticket.category}
                    </span>
                    {isPast && (
                        <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                            Encerrado
                        </span>
                    )}
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-1">{ticket.trackTitle}</h3>
                <p className="text-gray-600 font-medium mb-6">{ticket.sessionTitle}</p>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> {new Date(ticket.eventDate).toLocaleDateString()}
                    </div>
                    {ticket.seatId && (
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> Assento {ticket.seatId}
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-gray-50 p-8 flex items-center justify-center border-t md:border-t-0 md:border-l border-gray-100">
                <div className="bg-white p-3 rounded-2xl shadow-inner opacity-100 transition-opacity">
                    <div className={isPast ? "opacity-30 grayscale" : ""}>
                        <QRCodeSVG value={ticket.id} size={120} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function EmptyTicketsState() {
    const navigate = useNavigate();
    return (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300">
            <TicketIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Nenhum evento futuro. Explore as trilhas!</p>
            <button onClick={() => navigate("/")} className="mt-4 text-cobalt-600 font-bold hover:underline">
                Ver Trilhas
            </button>
        </div>
    );
}
