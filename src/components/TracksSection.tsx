// src/components/TracksSection.tsx
import { Suspense } from "react";
import { Await } from "react-router-dom";
import { TrackGrid } from "./TrackGrid";
import { TrackSkeleton } from "./TrackSkeleton";
import type { Track } from "../types/track";

interface TracksSectionProps {
    tracksPromise: Promise<Track[]>;
}

export function TracksSection({ tracksPromise }: TracksSectionProps) {
    return (
        <section id="tracks" className="bg-gray-50 py-24 border-t border-gray-200 flex-1">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Escolha seu Caminho
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Selecione uma trilha para descobrir sessões especializadas, workshops
                        práticos e painéis de especialistas adaptados aos seus interesses.
                    </p>
                </div>

                <Suspense fallback={<TrackSkeleton />}>
                    <Await
                        resolve={tracksPromise}
                        errorElement={
                            <p className="text-center text-red-500 font-medium">
                                Erro ao carregar as trilhas. Por favor, tente novamente mais tarde.
                            </p>
                        }
                    >
                        {(resolvedTracks: Track[]) => <TrackGrid tracks={resolvedTracks} />}
                    </Await>
                </Suspense>
            </div>
        </section>
    );
}
