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
import Arriveds from "../pages/arrived/arriveds";
import Arrived from "../pages/arrived/arrived";
import ArrivedFormPage from "../pages/arrived/ui/arriveds-form-page";
import Sales from "../pages/sale/sales";
import SalesFormPage from "../pages/sale/ui/sales-form-page";
import Sale from "../pages/sale/sale";
import Subscribes from "../pages/subscribe/subscribes";
import Subscribe from "../pages/subscribe/subscribe";
import ClientsPaid from "../pages/clients/clients-paid";
import Servers from "../pages/server/servers";
import Server from "../pages/server/server";

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
            path: "paid-clients",
            element: <ClientsPaid />,
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
            path: "arriveds",
            element: <Arriveds />,
          },
          {
            path: "arrived/create",
            element: <ArrivedFormPage />,
          },
          {
            path: "arrived/edit/:id",
            element: <ArrivedFormPage />,
          },
          {
            path: "arrived/:id",
            element: <Arrived />,
          },
          {
            path: "sales",
            element: <Sales />,
          },
          {
            path: "sale/:id",
            element: <Sale />,
          },
          {
            path: "sale/create",
            element: <SalesFormPage />,
          },
          {
            path: "sale/edit/:id",
            element: <SalesFormPage />,
          },
          {
            path: "subscribes",
            element: <Subscribes />,
          },
          {
            path: "subscribe/:id",
            element: <Subscribe />,
          },
          {
            path: "servers",
            element: <Servers />,
          },
          {
            path: "server/:id",
            element: <Server />,
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
