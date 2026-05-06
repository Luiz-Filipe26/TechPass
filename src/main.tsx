import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { TrackDetailsPage } from "./pages/TrackDetailsPage"; // Importação nova
import { getTracks, getTrackById } from "./services/trackService"; // Importação atualizada
import { getEventStats } from "./services/eventService";
import "./index.css";
import { TicketProvider } from "./contexts/TicketContext";
import { AuthProvider } from "./contexts/AuthContext";
import { SessionDetailsPage } from "./pages/SessionDetailsPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
                loader: () => {
                    return {
                        tracksPromise: getTracks(),
                        statsPromise: getEventStats(),
                    };
                },
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "tracks/:id",
                element: <TrackDetailsPage />,
                loader: ({ params }) => {
                    if (!params.id) throw new Error("ID da trilha é obrigatório");
                    return {
                        trackPromise: getTrackById(params.id),
                    };
                },
            },
            {
                path: "tracks/:trackId/sessions/:sessionId",
                element: <SessionDetailsPage />,
                loader: async ({ params }) => {
                    const track = await getTrackById(params.trackId!);
                    const session = track.sessions.find((s) => s.id === params.sessionId);
                    if (!session) throw new Error("Sessão não encontrada");
                    return { track, session };
                },
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
