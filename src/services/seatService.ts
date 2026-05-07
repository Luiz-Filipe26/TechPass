export interface RowDef {
    id: string;
    type: "vip" | "standard";
}

export interface SeatMapLayout {
    rows: RowDef[];
    seatsPerRow: number;
    occupiedSeats: string[];
}

const LAYOUT_MOCK: Pick<SeatMapLayout, "rows" | "seatsPerRow"> = {
    rows: [
        { id: "A", type: "vip" },
        { id: "B", type: "vip" },
        { id: "C", type: "standard" },
        { id: "D", type: "standard" },
        { id: "E", type: "standard" },
    ],
    seatsPerRow: 8,
};

export async function getSeatMapLayout(sessionId: string): Promise<SeatMapLayout> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const occupiedSeats: string[] = [];
    LAYOUT_MOCK.rows.forEach((row) => {
        for (let i = 1; i <= LAYOUT_MOCK.seatsPerRow; i++) {
            const seed = sessionId.charCodeAt(0) + i + row.id.charCodeAt(0);
            if (seed % 3 === 0) occupiedSeats.push(`${row.id}${i}`);
        }
    });

    return {
        ...LAYOUT_MOCK,
        occupiedSeats,
    };
}
