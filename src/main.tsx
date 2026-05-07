import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { HomePage, homePageLoader } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { trackDetailsLoader, TrackDetailsPage } from "./pages/TrackDetailsPage";
import { sessionDetailsLoader, SessionDetailsPage } from "./pages/SessionDetailsPage";
import { checkoutLoader, CheckoutPage } from "./pages/CheckoutPage";
import { ProfilePage } from "./pages/ProfilePage";
import { GlobalError } from "./components/GlobalError";

const basename = import.meta.env.BASE_URL;

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <RootLayout />,
            errorElement: <GlobalError />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                    loader: homePageLoader,
                },
                {
                    path: "login",
                    element: <LoginPage />,
                },
                {
                    path: "tracks/:id",
                    element: <TrackDetailsPage />,
                    loader: trackDetailsLoader,
                },
                {
                    path: "tracks/:trackId/sessions/:sessionId",
                    element: <SessionDetailsPage />,
                    loader: sessionDetailsLoader,
                },
                {
                    path: "checkout",
                    element: <CheckoutPage />,
                    loader: checkoutLoader,
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
