import { Link } from "react-router-dom";
import { User, Ticket } from "lucide-react";

export function Header() {
    return (
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link
                    to="/"
                    className="flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                    <Ticket className="w-6 h-6 text-cobalt-600" />
                    <span className="font-bold text-xl tracking-tight text-cobalt-600">
                        TechPass
                    </span>
                </Link>

                <nav className="flex items-center gap-6">
                    <a
                        href="/#tracks"
                        className="text-lg font-medium text-gray-600 hover:text-cobalt-600 transition-colors"
                    >
                        Trilhas
                    </a>

                    <div className="w-px h-4 bg-gray-300"></div>

                    <Link
                        to="/profile"
                        className="group text-lg font-medium text-gray-600 hover:text-cobalt-600 transition-colors flex items-center gap-2"
                    >
                        <User className="w-5 h-5 text-gray-400 group-hover:text-cobalt-600 transition-colors" />
                        Meu Perfil
                    </Link>
                </nav>
            </div>
        </header>
    );
}
