import { MapPin, User } from "lucide-react";
import type { Track } from "@/types/track";
import { AvailabilityIndicator } from "@/components/AvailabilityIndicator";

export function TrackHero(props: { track: Track }) {
    return (
        <section className="relative h-[60vh] min-h-100 w-full bg-gray-900">
            <img
                src={props.track.imageUrl}
                alt={props.track.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent" />

            <div className="absolute bottom-0 w-full">
                <div className="max-w-5xl mx-auto px-4 pb-12">
                    <div className="mb-4">
                        <AvailabilityIndicator
                            capacity={props.track.auditorium.capacity}
                            reserved={props.track.auditorium.reserved}
                        />
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
                        {props.track.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-6 leading-relaxed">
                        {props.track.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 text-sm md:text-base font-medium text-gray-200">
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5 text-cobalt-400" />
                            <span>{props.track.mainSpeaker}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-cobalt-400" />
                            <span>{props.track.auditorium.location}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
