import { StrictMode } from "react";
import { store, persistor } from "./redux/store.js"; // Import store and persistor
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  LikedVideos,
  MyContent,
  MyDashboard,
  MyProfile,
  Settings,
  History,
  Login,
  SignUp,
  EditProfile,
  Logout,
  ChangePassword,
  PlayVIdeo,
  PlaylistPage,
} from "./index.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import UploadVideo from "./Components/UploadVideo.jsx";

// Router configuration
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
        path: "/profile",
        element: <MyProfile />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register-user",
        element: <SignUp />,
      },
      {
        path: "/edit-profile",
        element: <EditProfile />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/play-video/:id",
        element: <PlayVIdeo />,
      },
      {
        path: "/upload-video",
        element: <UploadVideo />,
      },
      {
        path: "/playlist/:id",
        element: <PlaylistPage />,
      },
    ],
  },
]);

// Render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={Router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
