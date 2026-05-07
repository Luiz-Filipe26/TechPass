import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Crumb {
    label: string;
    to?: string;
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
    return (
        <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6">
            {crumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1">
                    {i > 0 && <ChevronRight className="w-3 h-3" />}

                    {crumb.to ? (
                        <Link to={crumb.to} className="hover:text-cobalt-600 transition-colors">
                            {crumb.label}
                        </Link>
                    ) : (
                        <span className="text-gray-900 font-medium">{crumb.label}</span>
                    )}
                </span>
            ))}
        </nav>
    );
}
