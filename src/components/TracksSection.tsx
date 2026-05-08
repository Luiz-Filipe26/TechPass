import { Suspense } from "react";
import { Await, useRevalidator } from "react-router-dom";
import type { Track } from "../types/track";
import { TrackCard } from "./TrackCard";

interface TracksSectionProps {
    tracksPromise: Promise<Track[]>;
}

function TrackItemsSkeleton() {
    return (
        <>
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm">
                    <div className="h-48 w-full bg-gray-200 animate-pulse rounded-xl mb-4" />
                    <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded mb-2" />
                    <div className="h-4 w-full bg-gray-100 animate-pulse rounded mb-1" />
                    <div className="h-4 w-2/3 bg-gray-100 animate-pulse rounded" />
                </div>
            ))}
        </>
    );
}

export function TracksSection({ tracksPromise }: TracksSectionProps) {
    return (
        <section id="tracks" className="bg-gray-50 pt-10 pb-16 md:pt-10 md:pb-24 border-t border-gray-200 flex-1">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Escolha seu Caminho</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Selecione uma trilha para descobrir sessões especializadas, workshops práticos e painéis de
                        especialistas adaptados aos seus interesses.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Suspense fallback={<TrackItemsSkeleton />}>
                        <Await resolve={tracksPromise} errorElement={<TracksError />}>
                            {(resolvedTracks: Track[]) => (
                                <>
                                    {resolvedTracks.map((track) => (
                                        <TrackCard
                                            key={track.id}
                                            {...track}
                                            keynoteId={track.sessions.find((s) => s.isKeynote)?.id}
                                        />
                                    ))}
                                </>
                            )}
                        </Await>
                    </Suspense>
                </div>
            </div>
        </section>
    );
}

function TracksError() {
    const { revalidate } = useRevalidator();
    return (
        <div className="col-span-full text-center">
            <p className="text-red-500 font-medium mb-3">Erro ao carregar as trilhas.</p>
            <button onClick={revalidate}>Tentar novamente</button>
        </div>
    );
}
