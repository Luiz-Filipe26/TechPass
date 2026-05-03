import { TrackCard } from "./TrackCard";
import type { Track } from "../types/track";

interface TrackGridProps {
    tracks: Track[];
}

export function TrackGrid({ tracks }: TrackGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tracks.map((track) => (
                <TrackCard key={track.id} {...track} />
            ))}
        </div>
    );
}
