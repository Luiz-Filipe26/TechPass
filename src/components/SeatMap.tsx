import { useState } from "react";
import { type RowDef, type SeatMapLayout } from "@/services/seatService";

export interface SeatMapProps {
    layout: SeatMapLayout;
    onSeatSelect: (seatId: string | null, category: "vip" | "standard") => void;
}

export function SeatMap({ layout, onSeatSelect }: SeatMapProps) {
    const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

    const handleSelect = (seatId: string, type: "vip" | "standard", isOccupied: boolean) => {
        if (isOccupied) return;
        const newSeat = selectedSeat === seatId ? null : seatId;
        setSelectedSeat(newSeat);
        onSeatSelect(newSeat, newSeat ? type : "standard");
    };

    return (
        <div className="bg-gray-900 rounded-3xl p-8 shadow-inner overflow-x-auto">
            <div className="min-w-100 flex flex-col items-center">
                <Stage />

                <div className="flex flex-col gap-4 items-center w-full max-w-lg">
                    {layout.rows.map((row, index) => {
                        const prevRow = layout.rows[index - 1];
                        const showSeparator = prevRow?.type === "vip" && row.type === "standard";

                        return (
                            <div key={row.id} className="w-full flex flex-col items-center">
                                {showSeparator && <VipSeparator />}

                                <SeatRow
                                    row={row}
                                    seatsPerRow={layout.seatsPerRow}
                                    occupiedSeats={layout.occupiedSeats}
                                    selectedSeat={selectedSeat}
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

interface SeatRowProps {
    row: RowDef;
    seatsPerRow: number;
    occupiedSeats: string[];
    selectedSeat: string | null;
    handleSelect: (seatId: string, type: "vip" | "standard", occupied: boolean) => void;
}

function SeatRow({ row, seatsPerRow, occupiedSeats, selectedSeat, handleSelect }: SeatRowProps) {
    return (
        <div className="flex gap-3 items-center">
            <span className="w-6 text-center text-gray-500 font-bold" aria-hidden="true">
                {row.id}
            </span>
            <div className="flex gap-2">
                {Array.from({ length: seatsPerRow }).map((_, i) => {
                    const seatId = `${row.id}${i + 1}`;
                    const isOccupied = occupiedSeats.includes(seatId);
                    const isSelected = selectedSeat === seatId;

                    return (
                        <Seat
                            key={seatId}
                            seatId={seatId}
                            type={row.type}
                            occupied={isOccupied}
                            isSelected={isSelected}
                            onSelect={() => handleSelect(seatId, row.type, isOccupied)}
                        />
                    );
                })}
            </div>
            <span className="w-6 text-center text-gray-500 font-bold" aria-hidden="true">
                {row.id}
            </span>
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
    const getStyles = () => {
        if (occupied) return "bg-red-500 opacity-40 cursor-not-allowed";
        if (isSelected) return "bg-blue-600 ring-4 ring-blue-500/50 scale-110 z-20 shadow-lg";
        return "bg-emerald-600 hover:bg-teal-700 transition-all duration-300 cursor-pointer hover:shadow-md";
    };

    const label = occupied
        ? `Assento ${seatId} - Ocupado`
        : isSelected
            ? `Assento ${seatId} - Selecionado`
            : `Assento ${seatId} - Disponível (${type.toUpperCase()})`;

    return (
        <button
            type="button"
            onClick={onSelect}
            disabled={occupied}
            title={label}
            aria-label={label}
            aria-pressed={isSelected}
            className={`w-10 h-10 rounded-t-xl rounded-b-md shadow-sm ${getStyles()}`}
        />
    );
}

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
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
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
                <div className="w-4 h-4 bg-emerald-500 rounded-sm" aria-hidden="true"></div> Disponível
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-sm ring-2 ring-blue-500/50" aria-hidden="true"></div>{" "}
                Selecionado
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 opacity-40 rounded-sm" aria-hidden="true"></div> Ocupado
            </div>
        </div>
    );
}
