import { Suspense } from "react";
import { Await } from "react-router-dom";
import { StatCard } from "./StatCard";
import type { EventStat } from "../types/event";

interface AboutSectionProps {
    statsPromise: Promise<EventStat[]>;
}

export function AboutSection({ statsPromise }: AboutSectionProps) {
    return (
        <section className="pt-12 pb-6 md:pt-8 md:pb-6 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-6 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sobre o Summit</h2>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        O <strong className="text-cobalt-600">Urban Innovation Summit</strong> é o principal ponto de
                        encontro para visionários e construtores...
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <Suspense fallback={<StatItemsSkeleton />}>
                        <Await resolve={statsPromise}>
                            {(resolvedStats: EventStat[]) => (
                                <>
                                    {resolvedStats.map((stat) => (
                                        <StatCard
                                            key={stat.id}
                                            iconName={stat.iconName}
                                            value={stat.value}
                                            label={stat.label}
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

function StatItemsSkeleton() {
    return (
        <>
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center">
                    <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full mb-3" />
                    <div className="h-8 w-20 bg-gray-200 animate-pulse rounded mb-2" />
                    <div className="h-4 w-24 bg-gray-100 animate-pulse rounded" />
                </div>
            ))}
        </>
    );
}
