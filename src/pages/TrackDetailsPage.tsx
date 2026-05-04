import { Suspense } from "react";
import { useLoaderData, Await, Link } from "react-router-dom";
import type { Track } from "@/types/track";
import { SessionCard } from "@/components/SessionCard";
import { useTickets } from "@/contexts/TicketContext";
import { TrackHero } from "@/components/TrackHero";
import { EnrollmentCTA } from "@/components/EnrollmentCTA";

function TrackDetailsSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20 animate-pulse">
            {/* Hero Skeleton */}
            <div className="h-[60vh] min-h-100 w-full bg-gray-200" />

            <main className="max-w-5xl mx-auto px-4 py-12">
                {/* CTA Skeleton */}
                <div className="h-30 w-full bg-gray-200 rounded-3xl mb-16 shadow-sm border border-gray-100" />

                {/* Lista de Sessões Skeleton */}
                <div>
                    <div className="h-8 w-48 bg-gray-200 rounded-md mb-6" />
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-40 w-full bg-gray-200 rounded-2xl border border-gray-100" />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

function TrackDetailsContent(props: { track: Track }) {
    const { track } = props;
    const { isEnrolled, enrollInTrack } = useTickets();
    const userHasAccess = isEnrolled(track.id);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <TrackHero track={track} />

            <main className="max-w-5xl mx-auto px-4 py-12">
                <EnrollmentCTA track={track} isEnrolled={userHasAccess} onEnroll={() => enrollInTrack(track.id)} />

                <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Agenda da Trilha</h3>
                    <div className="space-y-4">
                        {track.sessions.map((session) => (
                            <SessionCard
                                key={session.id}
                                session={session}
                                trackId={track.id}
                                isDisabled={!userHasAccess}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export function TrackDetailsPage() {
    const data = useLoaderData() as { trackPromise: Promise<Track> };

    return (
        <Suspense fallback={<TrackDetailsSkeleton />}>
            <Await
                resolve={data.trackPromise}
                errorElement={
                    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gray-50 text-center px-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Trilha não encontrada</h2>
                        <p className="text-gray-600">A trilha que você está procurando não existe ou foi removida.</p>
                        <Link to="/" className="mt-6 text-cobalt-600 font-medium hover:underline">
                            Voltar para o início
                        </Link>
                    </div>
                }
            >
                {(resolvedTrack: Track) => <TrackDetailsContent track={resolvedTrack} />}
            </Await>
        </Suspense>
    );
}
