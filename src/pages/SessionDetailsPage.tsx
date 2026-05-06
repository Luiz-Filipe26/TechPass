import { useState } from "react";
import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import { Calendar, Clock, MapPin, User, ArrowLeft } from "lucide-react";
import type { Track, Session } from "@/types/track";
import { useAuth } from "@/contexts/AuthContext";
import { useTickets } from "@/contexts/TicketContext";
import { formatMap, levelMap } from "@/utils/badges";
import { AvailabilityIndicator } from "@/components/AvailabilityIndicator";
import { SeatMap } from "@/components/SeatMap";

interface LoaderData {
    track: Track;
    session: Session;
}

export function SessionDetailsPage() {
    const { track, session } = useLoaderData() as LoaderData;
    const { user } = useAuth();
    const { isEnrolled } = useTickets();
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedSeat, setSelectedSeat] = useState<{ id: string; category: "vip" | "standard" } | null>(null);

    const format = formatMap[session.format];
    const level = levelMap[session.level];
    const alreadyEnrolled = isEnrolled(track.id);

    const handleAction = () => {
        if (!user) {
            // Guarda onde o usuário estava para ele voltar pra cá após o login
            navigate("/login", { state: { from: location.pathname } });
            return;
        }

        // Se chegou aqui, está logado. Vamos mandar para o checkout.
        const checkoutData = {
            trackId: track.id,
            trackTitle: track.title,
            sessionId: session.id,
            seatId: selectedSeat?.id || null,
            category: selectedSeat?.category || "general",
            eventDate: session.date,
        };

        // Usa o state do Router para passar dados sem colocar na URL
        navigate("/checkout", { state: checkoutData });
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Cabeçalho Limpo */}
            <header className="bg-white border-b border-gray-200 py-6">
                <div className="max-w-5xl mx-auto px-4">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-cobalt-600 mb-6 font-medium transition-colors">
                        <ArrowLeft className="w-5 h-5" /> Voltar para a trilha
                    </button>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-md ${format.color}`}>{format.label}</span>
                        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-md ${level.color}`}>{level.label}</span>
                        {session.isKeynote && (
                            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-md bg-cobalt-900 text-white">KEYNOTE • ABRE A TRILHA</span>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">{session.title}</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mb-8 leading-relaxed">{session.description}</p>

                    <div className="flex flex-wrap items-center gap-6 text-gray-600 font-medium bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-cobalt-600" /> {session.date.split("-").reverse().join("/")}</div>
                        <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-cobalt-600" /> {session.time}</div>
                        <div className="flex items-center gap-2"><User className="w-5 h-5 text-cobalt-600" /> {track.mainSpeaker}</div>
                        <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-cobalt-600" /> {track.auditorium.location}</div>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-12">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                {session.isKeynote ? "Escolha seu assento" : "Garantir participação"}
                            </h2>
                            <p className="text-gray-600">
                                {session.isKeynote 
                                    ? "Ao reservar seu assento no Keynote, você garante seu ingresso para toda a trilha."
                                    : "Reserve sua vaga para esta sessão específica."}
                            </p>
                        </div>
                        <AvailabilityIndicator capacity={session.capacity} reserved={session.reserved} className="text-base px-4 py-2 bg-gray-50 rounded-lg" />
                    </div>

                    {/* O Mapa aparece se for Keynote */}
                    {session.isKeynote && (
                        <div className="mb-8">
                            <SeatMap 
                                sessionId={session.id} 
                                onSeatSelect={(id, cat) => setSelectedSeat(id ? { id, category: cat } : null)} 
                            />
                        </div>
                    )}

                    {/* Barra de Ação Fixa no Rodapé do Card */}
                    <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-gray-600 font-medium">
                            {session.isKeynote && selectedSeat ? (
                                <span>Assento selecionado: <strong className="text-gray-900 text-lg">{selectedSeat.id}</strong> ({selectedSeat.category.toUpperCase()})</span>
                            ) : session.isKeynote ? (
                                <span>Nenhum assento selecionado.</span>
                            ) : (
                                <span>Vagas limitadas.</span>
                            )}
                        </div>

                        <button
                            onClick={handleAction}
                            disabled={alreadyEnrolled || (session.isKeynote && !selectedSeat)}
                            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                                alreadyEnrolled
                                    ? "bg-green-100 text-green-700 cursor-not-allowed"
                                    : (session.isKeynote && !selectedSeat)
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-cobalt-600 text-white hover:bg-cobalt-700 shadow-lg hover:-translate-y-1"
                            }`}
                        >
                            {alreadyEnrolled 
                                ? "Você já possui este ingresso ✓" 
                                : !user 
                                ? "Fazer Login para Comprar" 
                                : session.isKeynote 
                                ? "Comprar Ingresso" 
                                : "Reservar Vaga"}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
