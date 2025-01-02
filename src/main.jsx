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
import AuthLayout from "./Components/Auth Layout/AuthLayout.jsx"

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
        element: (
          <AuthLayout authentication>
            <History />
          </AuthLayout>
        ),
      },
      {
        path: "/likes",
        element: (
          <AuthLayout authentication>
            <LikedVideos />,
          </AuthLayout>
        ),
      },
      {
        path: "/my-content",
        element: (
          <AuthLayout authentication>
            <MyContent />,
          </AuthLayout>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <AuthLayout authentication>
            <MyDashboard />,
          </AuthLayout>
        ),
      },
      {
        path: "/profile/:username",
        element: (
          <AuthLayout authentication>
            <MyProfile />,
          </AuthLayout>
        ),
      },
      {
        path: "/settings",
        element: (
          <AuthLayout authentication>
            <Settings />,
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/register-user",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />,
          </AuthLayout>
        ),
      },
      {
        path: "/edit-profile",
        element: (
          <AuthLayout authentication>
            <EditProfile />
          </AuthLayout>
        ),
      },
      {
        path: "/change-password",
        element: (
          <AuthLayout authentication>
            <ChangePassword />,
          </AuthLayout>
        ),
      },
      {
        path: "/logout",
        element: (
          <AuthLayout authentication>
            <Logout />
          </AuthLayout>
        ),
      },
      {
        path: "/play-video/:id",
        element: (
          <AuthLayout authentication>
            <PlayVIdeo />
          </AuthLayout>
        ),
      },
      {
        path: "/upload-video",
        element: (
          <AuthLayout authentication>
            <UploadVideo />
          </AuthLayout>
        ),
      },
      {
        path: "/playlist/:id",
        element: (
          <AuthLayout authentication>
            <PlaylistPage />
          </AuthLayout>
        ),
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
