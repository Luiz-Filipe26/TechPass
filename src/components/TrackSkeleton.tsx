export function TrackSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm">
                    {/* Espaço da Imagem */}
                    <div className="h-48 w-full bg-gray-200 animate-pulse rounded-xl mb-4" />

                    {/* Título */}
                    <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded mb-2" />

                    {/* Descrição */}
                    <div className="h-4 w-full bg-gray-100 animate-pulse rounded mb-1" />
                    <div className="h-4 w-2/3 bg-gray-100 animate-pulse rounded" />
                </div>
            ))}
        </div>
    );
}
