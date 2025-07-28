import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/login";
import Dashboard from "../pages/dashboard/dashboard";
import ProtectedRoute from "./protected-route";
import AppLayout from "../layout/app-layout";
import { TokenManager } from "../config/token-manager";
import { ErrorPage } from "../pages/error/error";
import Clients from "../pages/clients/clients";
import ClientType from "../pages/clients/client-type";
import ClientPage from "../pages/clients/client";

const RedirectIfAuthenticated = () => {
  const token = TokenManager.getAccessToken();
  return token ? <Navigate to="/dashboard" replace /> : <LoginPage />;
};

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <RedirectIfAuthenticated />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "clients",
            element: <Clients />,
          },
          {
            path: "client/:id",
            element: <ClientPage />,
          },
          {
            path: "client-type",
            element: <ClientType />,
          },
          {
            path: "*",
            element: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);
