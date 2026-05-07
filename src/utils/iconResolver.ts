import { Calendar, MapPin, Users, Zap, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
    calendar: Calendar,
    users: Users,
    zap: Zap,
    mapPin: MapPin,
};

export function getIcon(name: string): LucideIcon {
    const Icon = iconMap[name];
    if (!Icon) {
        console.warn(`Ícone "${name}" não encontrado no mapeador. Usando fallback.`);
        return Zap;
    }
    return Icon;
}
