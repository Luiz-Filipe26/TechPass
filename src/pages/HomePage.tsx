import { useLoaderData } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { TracksSection } from "@/components/TracksSection";
import { getTracks } from "@/services/trackService";
import { getEventStats } from "@/services/eventService";

export async function homePageLoader() {
    return {
        tracksPromise: getTracks(),
        statsPromise: getEventStats(),
    };
}

export function useHomePageData() {
    return useLoaderData() as Awaited<ReturnType<typeof homePageLoader>>;
}

export function HomePage() {
    const data = useHomePageData();

    return (
        <div className="flex flex-col min-h-screen">
            <Hero />
            <AboutSection statsPromise={data.statsPromise} />
            <TracksSection tracksPromise={data.tracksPromise} />
        </div>
    );
}
