import { Link } from "react-router-dom";
import { User as UserIcon, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function UserMenu() {
    const { user, logout } = useAuth();

    if (!user) {
        return (
            <Link
                to="/login"
                className="group text-lg font-medium text-gray-600 hover:text-cobalt-600 transition-colors flex items-center gap-2"
            >
                <UserIcon className="w-5 h-5 text-gray-400 group-hover:text-cobalt-600 transition-colors" />
                Entrar
            </Link>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <Link
                to="/profile"
                className="group text-lg font-medium text-gray-600 hover:text-cobalt-600 transition-colors flex items-center gap-2"
            >
                <UserIcon className="w-5 h-5 text-gray-400 group-hover:text-cobalt-600 transition-colors" />
                <span className="hidden sm:inline">Olá, {user.name}</span>
            </Link>
            <button
                onClick={logout}
                className="text-sm font-medium text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                title="Sair"
            >
                <LogOut className="w-5 h-5" />
            </button>
        </div>
    );
}
