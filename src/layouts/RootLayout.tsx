import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { ScrollToHash } from "../components/ScrollToHash";
import { AuthProvider } from "../contexts/AuthContext";

export function RootLayout() {
    return (
        <AuthProvider>
            <div className="min-h-screen flex flex-col bg-white">
                <ScrollToHash />
                <Header />
                <main className="flex-1 flex flex-col">
                    <Outlet />
                </main>
            </div>
        </AuthProvider>
    );
}
