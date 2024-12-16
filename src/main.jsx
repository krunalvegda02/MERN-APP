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
        path: "/history",
        element: <History />,
      },
      {
        path: "/likedVideos",
        element: <LikedVideos />,
      },
      {
        path: "/my-content",
        element: <MyContent />,
      },
      {
        path: "/my-dashboard",
        element: <MyDashboard />,
      },
      {
        path: "/my-playlist",
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
    <App />
  </StrictMode>
);
