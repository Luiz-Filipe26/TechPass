import { getIcon } from "../utils/iconResolver";

interface StatCardProps {
    iconName: string;
    value: string;
    label: string;
}

export function StatCard({ iconName, value, label }: StatCardProps) {
    const Icon = getIcon(iconName);

    return (
        <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center transition-all hover:-translate-y-1 hover:shadow-md">
            <Icon className="w-10 h-10 text-cobalt-600 mb-3" />
            <h3 className="font-extrabold text-gray-900 text-2xl md:text-3xl">{value}</h3>
            <p className="text-base md:text-lg text-gray-600 font-medium mt-1">{label}</p>
        </div>
    );
}
