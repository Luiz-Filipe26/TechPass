import { Suspense } from "react";
import { Await } from "react-router-dom";
import { StatCard } from "./StatCard";
import { StatSkeleton } from "./StatSkeleton";
import type { EventStat } from "../types/event";

interface AboutSectionProps {
    statsPromise: Promise<EventStat[]>;
}

export function AboutSection({ statsPromise }: AboutSectionProps) {
    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-10 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Mais que uma Conferência
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        O TechPass é o principal ponto de encontro para visionários e construtores.
                        Ao longo de três dias, reunimos líderes globais, desenvolvedores e
                        formuladores de políticas para decodificar o futuro da tecnologia e
                        construir ecossistemas sustentáveis.
                    </p>
                </div>

                <Suspense fallback={<StatSkeleton />}>
                    <Await resolve={statsPromise}>
                        {(resolvedStats: EventStat[]) => (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                {resolvedStats.map((stat) => (
                                    <StatCard
                                        key={stat.id}
                                        iconName={stat.iconName}
                                        value={stat.value}
                                        label={stat.label}
                                    />
                                ))}
                            </div>
                        )}
                    </Await>
                </Suspense>
            </div>
        </section>
    );
}
