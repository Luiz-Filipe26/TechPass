import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { ScrollToHash } from "../components/ScrollToHash";
import { AuthProvider } from "../contexts/AuthContext";
import { TicketProvider } from "../contexts/TicketContext";
import { Toaster } from "react-hot-toast";

export function RootLayout() {
    return (
        <AuthProvider>
            <TicketProvider>
                <div className="min-h-screen flex flex-col bg-white">
                    <ScrollToHash />
                    <Header />
                    <main className="flex-1 flex flex-col">
                        <Toaster />
                        <Outlet />
                    </main>
                </div>
            </TicketProvider>
        </AuthProvider>
    );
}
