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

export function SessionCard(props: SessionCardProps) {
    const { session, trackId, isDisabled, isReserved, isSoldOut } = props;
    const isInactive = isDisabled || isReserved || isSoldOut;

    const hoverTitle = getHoverTitle(session.title, isDisabled, isReserved, isSoldOut);

    const baseStyles = "relative block overflow-hidden rounded-2xl border transition-all bg-white";

    const CardInner = (
        <div className="p-6 flex flex-col md:flex-row gap-6 relative z-0">
            {isInactive && <div className="absolute inset-0 bg-gray-600/10 pointer-events-none z-10" />}
            <SessionTimeInfo date={session.date} time={session.time} />
            <SessionMainContent {...props} />
        </div>
    );

    if (isInactive) {
        return (
            <div className={`${baseStyles} border-gray-300 cursor-default`} title={hoverTitle}>
                {CardInner}
            </div>
        );
    }

    return (
        <Link
            to={`/tracks/${trackId}/sessions/${session.id}`}
            className={`${baseStyles} border-gray-200 hover:border-cobalt-300 hover:shadow-lg hover:-translate-y-1`}
            title={hoverTitle}
        >
            {CardInner}
        </Link>
    );
}

function getHoverTitle(title: string, isDisabled: boolean, isReserved?: boolean, isSoldOut?: boolean) {
    if (isReserved) return "Sua vaga já está garantida para esta sessão!";
    if (isSoldOut) return "Infelizmente as vagas para esta sessão esgotaram.";
    if (isDisabled) return "Você precisa garantir o passe da trilha no Keynote antes de reservar esta sessão.";
    return `Clique para reservar vaga em: ${title}`;
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

function SessionMainContent({ session, isDisabled, isReserved, isSoldOut }: SessionCardProps) {
    const format = formatMap[session.format];
    const level = levelMap[session.level];
    const badgeStyles = "px-2.5 py-1 text-xs font-bold uppercase tracking-wide rounded-md";

    return (
        <div className="flex-1 w-full">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div className="flex flex-wrap gap-2">
                    <span className={`${badgeStyles} ${format.color}`}>{format.label}</span>
                    <span className={`${badgeStyles} ${level.color}`}>{level.label}</span>
                </div>

                <StatusBadge isReserved={isReserved} isSoldOut={isSoldOut} />
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

function StatusBadge({ isReserved, isSoldOut }: { isReserved?: boolean; isSoldOut?: boolean }) {
    const base =
        "shrink-0 inline-flex items-center gap-1.5 px-3 py-1 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-md z-20";

    if (isReserved)
        return (
            <span className={`${base} bg-emerald-600`}>
                <CheckCircle2 className="w-4 h-4" /> Vaga Garantida
            </span>
        );

    if (isSoldOut)
        return (
            <span className={`${base} bg-red-600`}>
                <XCircle className="w-4 h-4" /> Esgotado
            </span>
        );

    return null;
}
