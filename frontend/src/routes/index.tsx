import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../pages/error/error";
import LoginPage from "../pages/auth/login";
import Dashboard from "../pages/dashboard/dashboard";
import ProtectedRoute from "./protected-route";
import AppLayout from "../layout/app-layout";
import RestrictedRoute from "./restricted-route";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <RestrictedRoute>
        <LoginPage />
      </RestrictedRoute>
    ),
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
            path: "/",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);
