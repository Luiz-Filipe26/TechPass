import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function RootLayout() {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}
