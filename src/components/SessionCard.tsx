import { Link } from "react-router-dom";
import { Calendar, Clock, Lock } from "lucide-react";
import type { Session } from "../types/track";
import { formatMap, levelMap } from "../utils/badges";
import { AvailabilityIndicator } from "./AvailabilityIndicator";

interface SessionCardProps {
    session: Session;
    trackId: string;
    isDisabled: boolean;
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

function SessionMainContent({ session, isDisabled }: { session: Session; isDisabled: boolean }) {
    const format = formatMap[session.format];
    const level = levelMap[session.level];

    return (
        <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-3">
                <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wide rounded-md ${format.color}`}>
                    {format.label}
                </span>
                <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wide rounded-md ${level.color}`}>
                    {level.label}
                </span>
            </div>

            <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                {isDisabled && <Lock className="w-5 h-5 text-gray-400" />}
                {session.title}
            </h4>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{session.description}</p>

            <AvailabilityIndicator capacity={session.capacity} reserved={session.reserved} />
        </div>
    );
}

export function SessionCard({ session, trackId, isDisabled }: SessionCardProps) {
    const CardContainer = isDisabled ? "div" : Link;

    const containerStyles = `block rounded-2xl border p-6 transition-all ${isDisabled
            ? "bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed grayscale-50"
            : "bg-white border-gray-200 hover:border-cobalt-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
        }`;

    return (
        <CardContainer to={isDisabled ? "" : `/tracks/${trackId}/sessions/${session.id}`} className={containerStyles}>
            <div className="flex flex-col md:flex-row gap-6">
                <SessionTimeInfo date={session.date} time={session.time} />
                <SessionMainContent session={session} isDisabled={isDisabled} />
            </div>
        </CardContainer>
    );
}
