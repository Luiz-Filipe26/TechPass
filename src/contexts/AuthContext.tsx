import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../types/auth";
import { authService } from "../services/authService"; // Importando a camada de serviço

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        const session = localStorage.getItem("@TechPass:session");
        return session ? JSON.parse(session) : null;
    });

    const commitUserChange = (userData: User | null) => {
        if (userData) {
            localStorage.setItem("@TechPass:session", JSON.stringify(userData));
        } else {
            localStorage.removeItem("@TechPass:session");
        }
        setUser(userData);
    };

    async function login(email: string, password: string) {
        const userData = await authService.login(email, password);
        commitUserChange(userData);
    }

    async function register(name: string, email: string, password: string) {
        const userData = await authService.register(name, email, password);
        commitUserChange(userData);
    }

    function logout() {
        commitUserChange(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
