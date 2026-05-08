import { Link } from "react-router-dom";

export interface TrackCardProps {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    keynoteId?: string;
}

export function TrackCard({ id, title, description, imageUrl, keynoteId }: TrackCardProps) {
    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all hover:shadow-lg hover:-translate-y-1">
            <Link to={`/tracks/${id}`} className="flex-1">
                <div className="h-48 w-full overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={`Trilha sobre ${title}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-cobalt-600 transition-colors leading-tight">
                        {title}
                    </h3>
                    <p className="text-gray-700 text-base line-clamp-2 leading-relaxed">{description}</p>
                </div>
            </Link>

            {keynoteId && (
                <div className="px-6 pb-6">
                    <Link
                        to={`/tracks/${id}/sessions/${keynoteId}`}
                        className="w-full py-3 px-4 bg-cobalt-50 text-cobalt-600 font-bold rounded-xl hover:bg-cobalt-600 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                        Comprar Ingresso →
                    </Link>
                </div>
            )}
        </div>
    );
}
