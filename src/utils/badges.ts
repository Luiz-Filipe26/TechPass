export const formatMap = {
    talk: { label: "Palestra", color: "bg-blue-100 text-blue-800" },
    workshop: { label: "Workshop", color: "bg-purple-100 text-purple-800" },
    demo: { label: "Demonstração", color: "bg-orange-100 text-orange-800" },
} as const;

export const levelMap = {
    beginner: { label: "Iniciante", color: "bg-green-100 text-green-800" },
    intermediate: { label: "Intermediário", color: "bg-yellow-100 text-yellow-800" },
    advanced: { label: "Avançado", color: "bg-red-100 text-red-800" },
} as const;
