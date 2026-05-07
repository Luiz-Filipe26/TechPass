interface AvailabilityIndicatorProps {
    capacity: number;
    reserved: number;
    className?: string;
}

export function AvailabilityIndicator({ capacity, reserved, className = "text-sm" }: AvailabilityIndicatorProps) {
    const available = capacity - reserved;
    const occupancyRate = (reserved / capacity) * 100;

    const thresholds = [
        {
            min: 100,
            label: "🔴 Esgotado",
            color: "text-red-600 font-bold",
        },
        {
            min: 90,
            label: `🟡 Últimas vagas · ${available} restantes`,
            color: "text-amber-600 font-medium",
        },
        {
            min: 0,
            label: `🟢 Disponível · ${available} vagas`,
            color: "text-emerald-600 font-medium",
        },
    ];

    const { label, color } = thresholds.find((t) => occupancyRate >= t.min)!;

    return <span className={`inline-flex items-center gap-1.5 ${color} ${className}`}>{label}</span>;
}
