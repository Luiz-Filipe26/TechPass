import { type Track } from "../types/track";
import { MOCK_TRACKS } from "../data/mockTracks";

export async function getTracks(): Promise<Track[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_TRACKS);
        }, 800);
    });
}
