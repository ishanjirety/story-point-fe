import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import JoinSession from "./pages/join-session.tsx";
import Pointing from "./pages/pointing.tsx";
import { SessionContext } from "./store/session.context.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/join/:sessionId",
    element: <JoinSession />,
  },
  {
    path: "/session/:sessionId",
    element: <Pointing />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SessionContext>
      <RouterProvider router={router} />
    </SessionContext>
  </StrictMode>
);
