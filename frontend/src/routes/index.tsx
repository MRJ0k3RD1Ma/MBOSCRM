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
import Products from "../pages/products/products";
import Product from "../pages/products/product";
import ProductGroup from "../pages/products/product-group";
import ProductUnit from "../pages/products/product-unit";
import Suppliers from "../pages/suppler/suppliers";
import Supplier from "../pages/suppler/supplier";
import PaidSuppliers from "../pages/suppler/paid-supplier";
import Payments from "../pages/payment/payment";

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
            path: "products",
            element: <Products />,
          },
          {
            path: "product/:id",
            element: <Product />,
          },
          {
            path: "product-group",
            element: <ProductGroup />,
          },
          {
            path: "product-unit",
            element: <ProductUnit />,
          },
          {
            path: "suppliers",
            element: <Suppliers />,
          },
          {
            path: "supplier/:id",
            element: <Supplier />,
          },
          {
            path: "paid-suppliers",
            element: <PaidSuppliers />,
          },
          {
            path: "payment",
            element: <Payments />,
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
