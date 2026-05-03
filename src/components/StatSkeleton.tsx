export function StatSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[...Array(4)].map((_, i) => (
                <div
                    key={i}
                    className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center"
                >
                    <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full mb-3" />
                    <div className="h-8 w-20 bg-gray-200 animate-pulse rounded mb-2" />
                    <div className="h-4 w-24 bg-gray-100 animate-pulse rounded" />
                </div>
            ))}
        </div>
    );
}
