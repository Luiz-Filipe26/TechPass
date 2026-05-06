import { useState } from "react";

interface RowDef {
    id: string;
    type: "vip" | "standard";
}

const ROWS: RowDef[] = [
    { id: "A", type: "vip" },
    { id: "B", type: "vip" },
    { id: "C", type: "standard" },
    { id: "D", type: "standard" },
    { id: "E", type: "standard" },
];

const SEATS_PER_ROW = 8;

function Stage() {
    return (
        <div className="w-2/3 h-12 bg-gray-800 rounded-t-full mb-12 flex items-center justify-center border-b-4 border-cobalt-500 shadow-[0_10px_30px_rgba(37,99,235,0.2)]">
            <span className="text-gray-400 font-bold uppercase tracking-widest text-sm">Palco Principal</span>
        </div>
    );
}

function VipSeparator() {
    return (
        <div className="w-full my-6 flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-dashed border-gray-700"></div>
            </div>
            <div className="relative px-4 bg-gray-900 text-xs font-bold text-gray-500 uppercase tracking-widest">
                Fim do Setor VIP
            </div>
        </div>
    );
}

function Legend() {
    return (
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-300 bg-gray-800/50 px-6 py-3 rounded-full border border-gray-700">
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-500 rounded-sm"></div> Disponível
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-sm ring-2 ring-blue-500/50"></div> Selecionado
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 opacity-40 rounded-sm"></div> Ocupado
            </div>
        </div>
    );
}

interface SeatProps {
    seatId: string;
    type: "vip" | "standard";
    occupied: boolean;
    isSelected: boolean;
    onSelect: () => void;
}

function Seat({ seatId, type, occupied, isSelected, onSelect }: SeatProps) {
    let seatColor = "bg-emerald-500 hover:bg-emerald-400"; // Disponível
    if (occupied) seatColor = "bg-red-500 opacity-40 cursor-not-allowed"; // Ocupado
    if (isSelected) seatColor = "bg-blue-500 ring-4 ring-blue-500/50 scale-110"; // Selecionado

    const hoverText = occupied
        ? `Assento ${seatId} - Ocupado`
        : `Assento ${seatId} - Disponível (${type.toUpperCase()})`;

    return (
        <button
            onClick={onSelect}
            disabled={occupied}
            title={hoverText}
            className={`w-10 h-10 rounded-t-xl rounded-b-md transition-all duration-200 ${seatColor}`}
        />
    );
}

interface SeatRowProps {
    row: RowDef;
    selectedSeat: string | null;
    isOccupied: (rowId: string, seatNum: number) => boolean;
    handleSelect: (seatId: string, type: "vip" | "standard", occupied: boolean) => void;
}

function SeatRow({ row, selectedSeat, isOccupied, handleSelect }: SeatRowProps) {
    return (
        <div className="flex gap-3 items-center">
            <span className="w-6 text-center text-gray-500 font-bold">{row.id}</span>
            <div className="flex gap-2">
                {Array.from({ length: SEATS_PER_ROW }).map((_, i) => {
                    const seatNum = i + 1;
                    const seatId = `${row.id}${seatNum}`;
                    const occupied = isOccupied(row.id, seatNum);
                    const isSelected = selectedSeat === seatId;

                    return (
                        <Seat
                            key={seatId}
                            seatId={seatId}
                            type={row.type}
                            occupied={occupied}
                            isSelected={isSelected}
                            onSelect={() => handleSelect(seatId, row.type, occupied)}
                        />
                    );
                })}
            </div>
            <span className="w-6 text-center text-gray-500 font-bold">{row.id}</span>
        </div>
    );
}

interface SeatMapProps {
    onSeatSelect: (seatId: string | null, category: "vip" | "standard") => void;
    sessionId: string;
}

export function SeatMap({ onSeatSelect, sessionId }: SeatMapProps) {
    const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

    const isOccupied = (rowId: string, seatNum: number) => {
        const seed = sessionId.charCodeAt(0) + seatNum + rowId.charCodeAt(0);
        return seed % 3 === 0;
    };

    const handleSelect = (seatId: string, type: "vip" | "standard", occupied: boolean) => {
        if (occupied) return;

        const newSeat = selectedSeat === seatId ? null : seatId;
        setSelectedSeat(newSeat);

        if (newSeat) {
            onSeatSelect(newSeat, type);
        } else {
            onSeatSelect(null, "standard");
        }
    };

    return (
        <div className="bg-gray-900 rounded-3xl p-8 shadow-inner overflow-x-auto">
            <div className="min-w-100 flex flex-col items-center">
                <Stage />

                <div className="flex flex-col gap-4 items-center w-full max-w-lg">
                    {ROWS.map((row, index) => {
                        const prevRow = ROWS[index - 1];
                        const showSeparator = prevRow?.type === "vip" && row.type === "standard";

                        return (
                            <div key={row.id} className="w-full flex flex-col items-center">
                                {showSeparator && <VipSeparator />}

                                <SeatRow
                                    row={row}
                                    selectedSeat={selectedSeat}
                                    isOccupied={isOccupied}
                                    handleSelect={handleSelect}
                                />
                            </div>
                        );
                    })}
                </div>

                <Legend />
            </div>
        </div>
    );
}
