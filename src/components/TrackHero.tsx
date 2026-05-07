import { MapPin, User, type LucideIcon } from "lucide-react";
import type { Track } from "@/types/track";
import { AvailabilityIndicator } from "@/components/AvailabilityIndicator";

export function TrackHero({ track }: { track: Track }) {
    return (
        <section className="relative bg-cobalt-900 text-white overflow-hidden py-10 lg:py-16">
            <HeroBackgroundEffect />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <TrackHeroInfo track={track} />
                    <TrackHeroImage src={track.imageUrl} alt={track.title} />
                </div>
            </div>
        </section>
    );
}

function TrackHeroInfo({ track }: { track: Track }) {
    return (
        <div className="flex-1 w-full text-center lg:text-left">
            <div className="mb-6 flex justify-center lg:justify-start">
                <AvailabilityIndicator
                    capacity={track.auditorium.capacity}
                    reserved={track.auditorium.reserved}
                    className="text-lg md:text-xl bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10"
                />
            </div>

            <h1 className="text-4xl lg:text-6xl font-black tracking-tighter mb-6 leading-tight">{track.title}</h1>

            <p className="text-lg lg:text-xl text-cobalt-100/90 mb-10 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {track.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-base font-medium text-cobalt-100">
                <TrackMeta icon={User} text={track.mainSpeaker} />
                <TrackMeta icon={MapPin} text={track.auditorium.location} />
            </div>
        </div>
    );
}

function HeroBackgroundEffect() {
    return (
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
    );
}

function TrackMeta({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
    return (
        <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
            <Icon className="w-5 h-5 text-cobalt-300" />
            <span>{text}</span>
        </div>
    );
}

function TrackHeroImage({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
            <div className="absolute inset-0 bg-linear-to-tr from-blue-500 to-cobalt-300 rounded-3xl transform rotate-3 scale-105 opacity-40 blur-lg transition-transform duration-700 hover:rotate-6" />
            <img
                src={src}
                alt={`Imagem representando a trilha: ${alt}`}
                className="relative z-10 w-full aspect-video lg:aspect-4/3 object-cover rounded-3xl shadow-2xl border border-white/10"
            />
        </div>
    );
}
