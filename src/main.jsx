import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  LikedVideos,
  MyContent,
  MyDashboard,
  MyPlaylist,
  Settings,
  History,
} from "./index.js";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/watch-history",
        element: <History />,
      },
      {
        path: "/likes",
        element: <LikedVideos />,
      },
      {
        path: "/my-content",
        element: <MyContent />,
      },
      {
        path: "/dashboard",
        element: <MyDashboard />,
      },
      {
        path: "/playlist",
        element: <MyPlaylist />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={Router} />
  </StrictMode>
);
