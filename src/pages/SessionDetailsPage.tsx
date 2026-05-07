import { useState, Suspense, use } from "react";
import { useLoaderData, useNavigate, useLocation, type LoaderFunctionArgs } from "react-router-dom";
import { Calendar, Clock, MapPin, User, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTickets } from "@/contexts/TicketContext";
import { formatMap, levelMap } from "@/utils/badges";
import { AvailabilityIndicator } from "@/components/AvailabilityIndicator";
import { SeatMap } from "@/components/SeatMap";
import { getTrackById } from "@/services/trackService";
import type { TicketCategory } from "@/types/ticket";
import type { Track, Session } from "@/types/track";
import { getSeatMapLayout, type SeatMapLayout } from "@/services/seatService";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StepIndicator } from "@/components/StepIndicator";

export function sessionDetailsLoader({ params }: LoaderFunctionArgs) {
    const sessionPromise = getTrackById(params.trackId!).then((track) => {
        const session = track.sessions.find((s) => s.id === params.sessionId);
        if (!session) throw new Error("Sessão não encontrada");
        return { track, session };
    });

    const layoutPromise = getSeatMapLayout(params.sessionId!);

    return { sessionPromise, layoutPromise };
}

export function useSessionDetailsData() {
    return useLoaderData() as ReturnType<typeof sessionDetailsLoader>;
}

export function SessionDetailsPage() {
    const { sessionPromise, layoutPromise } = useSessionDetailsData();

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Suspense fallback={<SessionDetailsSkeleton />}>
                <SessionDetailsContent sessionPromise={sessionPromise} layoutPromise={layoutPromise} />
            </Suspense>
        </div>
    );
}

type SessionPageLayoutProps = {
    headerContent: React.ReactNode;
    mainContent: React.ReactNode;
    isSkeleton?: boolean;
};
function SessionPageLayout({ headerContent, mainContent, isSkeleton = false }: SessionPageLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <header className="bg-white border-b border-gray-200 py-6">
                <div className="max-w-5xl mx-auto px-4">{headerContent}</div>
            </header>
            <main className="max-w-5xl mx-auto px-4 py-12">
                <div
                    className={`bg-white rounded-3xl p-8 shadow-sm border border-gray-100 ${isSkeleton ? "" : "animate-in fade-in zoom-in-95 duration-300"
                        }`}
                >
                    {mainContent}
                </div>
            </main>
        </div>
    );
}

type SessionDetailsContentProps = {
    sessionPromise: Promise<{ track: Track; session: Session }>;
    layoutPromise: Promise<SeatMapLayout>;
};
function SessionDetailsContent({ sessionPromise, layoutPromise }: SessionDetailsContentProps) {
    const { track, session } = use(sessionPromise);
    const layout = use(layoutPromise);

    const { user } = useAuth();
    const { tickets, isEnrolled } = useTickets();
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedSeat, setSelectedSeat] = useState<{ id: string; category: TicketCategory } | null>(null);

    const hasTrackAccess = isEnrolled(track.id);
    const hasReservedThisSession = tickets.some((t) => t.sessionId === session.id);

    const isActionDisabled = session.isKeynote
        ? Boolean((user && hasTrackAccess) || (user && !selectedSeat))
        : Boolean(hasReservedThisSession || (user && !hasTrackAccess));

    const handleAction = () => {
        if (!user) {
            navigate("/login", { state: { from: location.pathname } });
            return;
        }

        const checkoutData = {
            trackId: track.id,
            trackTitle: track.title,
            sessionId: session.id,
            sessionTitle: session.title,
            seatId: selectedSeat?.id || null,
            category: session.isKeynote ? selectedSeat?.category || "standard" : "general",
            eventDate: session.date,
        };

        navigate("/checkout", { state: checkoutData });
    };

    const getButtonText = () => {
        if (!user) return "Fazer Login para Comprar";
        if (session.isKeynote) {
            return hasTrackAccess ? "Você já possui este ingresso ✓" : "Comprar Ingresso";
        } else {
            return hasReservedThisSession ? "Vaga Reservada ✓" : "Reservar Vaga";
        }
    };

    return (
        <SessionPageLayout
            headerContent={<SessionHeaderInfo track={track} session={session} />}
            mainContent={
                <>
                    <ActionHeader session={session} />
                    {session.isKeynote && (
                        <div className="mb-8">
                            <SeatMap
                                layout={layout}
                                onSeatSelect={(id, cat) => setSelectedSeat(id ? { id, category: cat } : null)}
                            />
                        </div>
                    )}
                    <ActionFooter
                        session={session}
                        selectedSeat={selectedSeat}
                        onAction={handleAction}
                        isActionDisabled={isActionDisabled}
                        buttonText={getButtonText()}
                        hasTrackAccess={hasTrackAccess}
                        hasReservedThisSession={hasReservedThisSession}
                    />
                </>
            }
        />
    );
}

function SessionHeaderInfo({ track, session }: { track: Track; session: Session }) {
    const navigate = useNavigate();

    return (
        <>
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-cobalt-600 mb-6 font-medium transition-colors"
            ></button>
            <StepIndicator currentStep="seat" />
            <Breadcrumbs
                crumbs={[
                    { label: "Início", to: "/" },
                    { label: track.title, to: `/tracks/${track.id}` },
                    { label: session.title },
                ]}
            />

            <SessionTags session={session} />

            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">{session.title}</h1>
            <p className="text-lg text-gray-600 max-w-3xl mb-8 leading-relaxed">{session.description}</p>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 font-medium bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-cobalt-600" /> {session.date.split("-").reverse().join("/")}
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-cobalt-600" /> {session.time}
                </div>
                <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-cobalt-600" /> {track.mainSpeaker}
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-cobalt-600" /> {track.auditorium.location}
                </div>
            </div>
        </>
    );
}

function SessionTags({ session }: { session: Session }) {
    const format = formatMap[session.format];
    const level = levelMap[session.level];
    const badgeBase = "px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-md";

    return (
        <div className="flex flex-wrap gap-2 mb-4">
            <span className={`${badgeBase} ${format.color}`}>{format.label}</span>
            <span className={`${badgeBase} ${level.color}`}>{level.label}</span>
            {session.isKeynote && (
                <span className={`${badgeBase} bg-cobalt-900 text-white`}>KEYNOTE • ABRE A TRILHA</span>
            )}
        </div>
    );
}

function ActionHeader({ session }: { session: Session }) {
    const title = session.isKeynote ? "Escolha seu assento" : "Garantir participação";
    const description = session.isKeynote
        ? "Ao reservar seu assento no Keynote, você garante seu ingresso para toda a trilha."
        : "Reserve sua vaga para esta sessão específica.";

    return (
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-600">{description}</p>
                <p className="text-sm text-gray-400 mt-1">Fileiras da frente são VIP · demais são Standard.</p>
            </div>

            <AvailabilityIndicator
                capacity={session.capacity}
                reserved={session.reserved}
                className="text-base px-4 py-2 bg-gray-50 rounded-lg shrink-0"
            />
        </div>
    );
}

type ActionFooterProps = {
    session: Session;
    selectedSeat: { id: string; category: TicketCategory } | null;
    onAction: () => void;
    isActionDisabled: boolean;
    buttonText: string;
    hasTrackAccess: boolean;
    hasReservedThisSession: boolean;
};

function ActionFooter({
    session,
    selectedSeat,
    onAction,
    isActionDisabled,
    buttonText,
    hasTrackAccess,
    hasReservedThisSession,
}: ActionFooterProps) {
    const getButtonClass = () => {
        if (session.isKeynote ? hasTrackAccess : hasReservedThisSession) {
            return "bg-green-100 text-green-700 cursor-not-allowed";
        }
        if (session.isKeynote && !selectedSeat) {
            return "bg-gray-100 text-gray-400 cursor-not-allowed";
        }
        return "bg-cobalt-600 text-white hover:bg-cobalt-700 shadow-lg hover:-translate-y-1";
    };

    return (
        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-gray-600 font-medium">
                {session.isKeynote && selectedSeat ? (
                    <span>
                        Assento selecionado: <strong className="text-gray-900 text-lg">{selectedSeat.id}</strong> (
                        {selectedSeat.category.toUpperCase()})
                    </span>
                ) : session.isKeynote ? (
                    <span>Nenhum assento selecionado.</span>
                ) : (
                    <span>Vagas limitadas. Incluso no seu passe da trilha.</span>
                )}
            </div>

            <button
                onClick={onAction}
                disabled={isActionDisabled}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${getButtonClass()}`}
            >
                {buttonText}
            </button>
        </div>
    );
}

function SessionDetailsSkeleton() {
    return (
        <SessionPageLayout
            isSkeleton={true}
            headerContent={
                <div className="animate-pulse w-full">
                    <div className="w-40 h-5 bg-gray-200 rounded mb-6" />

                    <div className="flex gap-2 mb-4">
                        <div className="w-20 h-6 bg-gray-200 rounded-md" />
                        <div className="w-24 h-6 bg-gray-200 rounded-md" />
                    </div>

                    <div className="h-12 w-3/4 bg-gray-300 rounded mb-4" />
                    <div className="h-6 w-full bg-gray-200 rounded mb-2" />
                    <div className="h-6 w-2/3 bg-gray-200 rounded mb-8" />

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-wrap gap-6">
                        <div className="h-6 w-24 bg-gray-200 rounded" />
                        <div className="h-6 w-24 bg-gray-200 rounded" />
                        <div className="h-6 w-32 bg-gray-200 rounded" />
                        <div className="h-6 w-32 bg-gray-200 rounded" />
                    </div>
                </div>
            }
            mainContent={
                <div className="animate-pulse w-full">
                    <div className="mb-8 flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex-1 space-y-3">
                            <div className="h-8 w-64 bg-gray-200 rounded" />
                            <div className="h-5 w-80 bg-gray-100 rounded" />
                        </div>
                        <div className="h-10 w-32 bg-gray-100 rounded-lg shrink-0" />
                    </div>

                    {/* Espaço do SeatMap */}
                    <div className="mb-8 h-100 w-full bg-gray-50 rounded-2xl border border-gray-100" />

                    <div className="border-t border-gray-100 pt-6 flex justify-between items-center gap-4">
                        <div className="h-6 w-64 bg-gray-100 rounded" />
                        <div className="h-14 w-48 bg-gray-200 rounded-xl" />
                    </div>
                </div>
            }
        />
    );
}
