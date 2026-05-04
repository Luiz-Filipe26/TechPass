import { type Track } from "../types/track";
import { MOCK_TRACKS } from "../data/mockTracks";

export async function getTracks(): Promise<Track[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_TRACKS);
        }, 800);
    });
}

export async function getTrackById(id: string): Promise<Track> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const track = MOCK_TRACKS.find((t) => t.id === id);
            if (!track) {
                reject(new Error("Trilha não encontrada"));
            } else {
                resolve(track);
            }
        }, 600);
    });
}
