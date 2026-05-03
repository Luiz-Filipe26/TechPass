import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { ScrollToHash } from "../components/ScrollToHash";

export function RootLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <ScrollToHash />
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}
