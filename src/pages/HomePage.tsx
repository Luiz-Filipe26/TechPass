import { useLoaderData } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { TracksSection } from "@/components/TracksSection";
import type { Track } from "@/types/track";
import type { EventStat } from "@/types/event";

export function HomePage() {
    const data = useLoaderData() as {
        tracksPromise: Promise<Track[]>;
        statsPromise: Promise<EventStat[]>;
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Hero />

            <AboutSection statsPromise={data.statsPromise} />
            <TracksSection tracksPromise={data.tracksPromise} />
        </div>
    );
}
