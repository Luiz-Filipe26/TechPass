import type { EventStat } from "../types/event";
import { EVENT_STATS_MOCK } from "../data/mockEvent";

export async function getEventStats(): Promise<EventStat[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(EVENT_STATS_MOCK);
        }, 500);
    });
}
