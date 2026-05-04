import { MapPin, User } from "lucide-react";
import type { Track } from "@/types/track";
import { AvailabilityIndicator } from "@/components/AvailabilityIndicator";

export function TrackHero(props: { track: Track }) {
    return (
        <section className="relative bg-cobalt-900 text-white overflow-hidden py-10 lg:py-16">
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="flex-1 w-full text-center lg:text-left">
                        <div className="mb-6 flex justify-center lg:justify-start">
                            <AvailabilityIndicator
                                capacity={props.track.auditorium.capacity}
                                reserved={props.track.auditorium.reserved}
                                className="text-lg md:text-xl bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10"
                            />
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-black tracking-tighter mb-6 leading-tight">
                            {props.track.title}
                        </h1>

                        <p className="text-lg lg:text-xl text-cobalt-100/90 mb-10 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            {props.track.description}
                        </p>

                        {/* Metadados da Trilha */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-base font-medium text-cobalt-100">
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                                <User className="w-5 h-5 text-cobalt-300" />
                                <span>{props.track.mainSpeaker}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                                <MapPin className="w-5 h-5 text-cobalt-300" />
                                <span>{props.track.auditorium.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* Coluna da Direita: Imagem da Trilha */}
                    <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
                        {/* Efeito de "sombra colorida" atrás da foto, igual à Home */}
                        <div className="absolute inset-0 bg-linear-to-tr from-blue-500 to-cobalt-300 rounded-3xl transform rotate-3 scale-105 opacity-40 blur-lg transition-transform duration-700 hover:rotate-6"></div>

                        {/* Imagem Principal nítida e ao lado */}
                        <img
                            src={props.track.imageUrl}
                            alt={`Imagem representando a trilha: ${props.track.title}`}
                            className="relative z-10 w-full aspect-video lg:aspect-[4/3] object-cover rounded-3xl shadow-2xl border border-white/10"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
