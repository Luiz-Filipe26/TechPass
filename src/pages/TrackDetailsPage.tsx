import { Suspense } from "react";
import { useLoaderData, Await, Link, type LoaderFunctionArgs } from "react-router-dom";
import type { Track } from "@/types/track";
import { SessionCard } from "@/components/SessionCard";
import { useTickets } from "@/contexts/TicketContext";
import { TrackHero } from "@/components/TrackHero";
import { EnrollmentCTA } from "@/components/EnrollmentCTA";
import { getTrackById } from "@/services/trackService";

export function trackDetailsLoader({ params }: LoaderFunctionArgs) {
    if (!params.id) throw new Error("ID da trilha é obrigatório");
    return {
        trackPromise: getTrackById(params.id),
    };
}

export function useTrackDetailsData() {
    return useLoaderData() as ReturnType<typeof trackDetailsLoader>;
}

export function TrackDetailsPage() {
    const data = useTrackDetailsData();

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Suspense fallback={<TrackDetailsSkeleton />}>
                <Await resolve={data.trackPromise} errorElement={<ErrorState />}>
                    {(resolvedTrack: Track) => <TrackDetailsContent track={resolvedTrack} />}
                </Await>
            </Suspense>
        </div>
    );
}

function TrackDetailsSkeleton() {
    return (
        <>
            <HeroSkeleton />
            <MainContainer>
                <CTASkeleton />
                <div>
                    <SkeletonBase className="h-8 w-48 rounded-md mb-6" />
                    <SessionList>
                        {Array.from({ length: 3 }).map((_, i) => (
                            <SkeletonBase key={i} className="h-40 w-full rounded-2xl border border-gray-100" />
                        ))}
                    </SessionList>
                </div>
            </MainContainer>
        </>
    );
}

function TrackDetailsContent({ track }: { track: Track }) {
    const { isEnrolled, tickets } = useTickets();
    const userHasAccess = isEnrolled(track.id);
    const keynoteSession = track.sessions.find((s) => s.isKeynote);

    return (
        <>
            <TrackHero track={track} />
            <MainContainer>
                <EnrollmentCTA track={track} isEnrolled={userHasAccess} keynoteId={keynoteSession?.id} />

                <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Agenda da Trilha</h3>
                    <SessionList>
                        {track.sessions.map((session) => (
                            <SessionCard
                                key={session.id}
                                session={session}
                                trackId={track.id}
                                isDisabled={!userHasAccess && !session.isKeynote}
                                isReserved={tickets.some((t) => t.sessionId === session.id)}
                                isSoldOut={session.reserved >= session.capacity}
                            />
                        ))}
                    </SessionList>
                </div>
            </MainContainer>
        </>
    );
}

const MainContainer = ({ children }: { children: React.ReactNode }) => (
    <main className="max-w-5xl mx-auto px-4 py-12">{children}</main>
);

const SessionList = ({ children }: { children: React.ReactNode }) => <div className="space-y-4">{children}</div>;

const SkeletonBase = ({ className = "" }: { className?: string }) => (
    <div className={`bg-gray-200 animate-pulse ${className}`} />
);

const HeroSkeleton = () => <SkeletonBase className="h-[60vh] min-h-100 w-full" />;
const CTASkeleton = () => <SkeletonBase className="h-30 w-full rounded-3xl mb-16 shadow-sm border border-gray-100" />;

const ErrorState = () => (
    <div className="flex flex-col items-center justify-center text-center px-4 py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Trilha não encontrada</h2>
        <p className="text-gray-600">A trilha que você está procurando não existe ou foi removida.</p>
        <Link to="/" className="mt-6 text-cobalt-600 font-medium hover:underline">
            Voltar para o início
        </Link>
    </div>
);
