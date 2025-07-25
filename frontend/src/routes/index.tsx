import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../pages/error/error";
import LoginPage from "../pages/auth/login";
import Dashboard from "../pages/dashboard/dashboard";
import ProtectedRoute from "./protected-route";
import AppLayout from "../layout/app-layout";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);
