import { Link } from "react-router-dom";
import { Calendar, Clock, Lock, CheckCircle2, XCircle } from "lucide-react";
import type { Session } from "../types/track";
import { formatMap, levelMap } from "../utils/badges";
import { AvailabilityIndicator } from "./AvailabilityIndicator";

interface SessionCardProps {
    session: Session;
    trackId: string;
    isDisabled: boolean;
    isReserved?: boolean;
    isSoldOut?: boolean;
}

function SessionTimeInfo({ date, time }: { date: string; time: string }) {
    const formattedDate = date.split("-").reverse().join("/");

    return (
        <div className="shrink-0 w-32 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 pr-0 md:pr-4">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-900">
                <Clock className="w-4 h-4 text-cobalt-600" />
                <span className="text-xl font-bold">{time}</span>
            </div>
        </div>
    );
}

function SessionMainContent({
    session,
    isDisabled,
    isReserved,
    isSoldOut,
}: {
    session: Session;
    isDisabled: boolean;
    isReserved?: boolean;
    isSoldOut?: boolean;
}) {
    const format = formatMap[session.format];
    const level = levelMap[session.level];

    return (
        <div className="flex-1 w-full">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div className="flex flex-wrap gap-2">
                    <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wide rounded-md ${format.color}`}>
                        {format.label}
                    </span>
                    <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wide rounded-md ${level.color}`}>
                        {level.label}
                    </span>
                </div>

                {/* Status Destacado (Prioridade: Vaga Garantida > Esgotado) */}
                {isReserved ? (
                    <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-md relative z-20">
                        <CheckCircle2 className="w-4 h-4" />
                        Vaga Garantida
                    </span>
                ) : isSoldOut ? (
                    <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 bg-red-600 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-md relative z-20">
                        <XCircle className="w-4 h-4" />
                        Esgotado
                    </span>
                ) : null}
            </div>

            <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                {isDisabled && !isReserved && !isSoldOut && <Lock className="w-5 h-5 text-gray-400" />}
                {session.title}
            </h4>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{session.description}</p>

            <AvailabilityIndicator capacity={session.capacity} reserved={session.reserved} />
        </div>
    );
}

export function SessionCard({ session, trackId, isDisabled, isReserved, isSoldOut }: SessionCardProps) {
    // Nova lógica de Hover Title com as prioridades corretas
    const hoverTitle = isReserved
        ? "Sua vaga já está garantida para esta sessão!"
        : isSoldOut
        ? "Infelizmente as vagas para esta sessão esgotaram."
        : isDisabled
        ? "Você precisa garantir o passe da trilha no Keynote antes de reservar esta sessão."
        : `Clique para reservar vaga em: ${session.title}`;

    const baseContainerStyles = "relative block overflow-hidden rounded-2xl border transition-all bg-white";

    // O card inativa se estiver Desabilitado, Reservado ou Esgotado
    const isInactive = isDisabled || isReserved || isSoldOut;

    if (isInactive) {
        return (
            <div className={`${baseContainerStyles} border-gray-300 cursor-default`} title={hoverTitle}>
                <div className="absolute inset-0 bg-gray-400/30 pointer-events-none z-10"></div>

                <div className="p-6 flex flex-col md:flex-row gap-6 relative z-0">
                    <SessionTimeInfo date={session.date} time={session.time} />
                    <SessionMainContent session={session} isDisabled={isDisabled} isReserved={isReserved} isSoldOut={isSoldOut} />
                </div>
            </div>
        );
    }

    return (
        <Link
            to={`/tracks/${trackId}/sessions/${session.id}`}
            className={`${baseContainerStyles} border-gray-200 hover:border-cobalt-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer`}
            title={hoverTitle}
        >
            <div className="p-6 flex flex-col md:flex-row gap-6 relative z-0">
                <SessionTimeInfo date={session.date} time={session.time} />
                <SessionMainContent session={session} isDisabled={isDisabled} isReserved={isReserved} isSoldOut={isSoldOut} />
            </div>
        </Link>
    );
}
