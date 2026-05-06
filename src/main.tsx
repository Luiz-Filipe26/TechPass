import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { TrackDetailsPage } from "./pages/TrackDetailsPage";
import { getTracks, getTrackById } from "./services/trackService";
import { getEventStats } from "./services/eventService";
import "./index.css";
import { SessionDetailsPage } from "./pages/SessionDetailsPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ProfilePage } from "./pages/ProfilePage";

const basename = import.meta.env.BASE_URL;

const router = createBrowserRouter(
    [
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
                {
                    path: "checkout",
                    element: <CheckoutPage />,
                },
                {
                    path: "profile",
                    element: <ProfilePage />,
                },
            ],
        },
    ],
    { basename },
);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
