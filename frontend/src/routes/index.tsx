import { Navigate, createBrowserRouter } from "react-router-dom";

import AppLayout from "../layout/app-layout";
import Appeal from "../pages/appeals/appeal";
import Appeals from "../pages/appeals/appeals";
import Arrived from "../pages/arrived/arrived";
import ArrivedFormPage from "../pages/arrived/ui/arriveds-form-page";
import ArrivedProducts from "../pages/arrived/arrived-products";
import Arriveds from "../pages/arrived/arriveds";
import ArrivedsCredit from "../pages/arrived/arriveds-credit";
import ClientPage from "../pages/clients/client";
import ClientType from "../pages/clients/client-type";
import Clients from "../pages/clients/clients";
import ClientsCredit from "../pages/clients/clients-credit";
import ClientsOverPaid from "../pages/clients/clients-over-paid";
import ClientsPaid from "../pages/clients/clients-paid";
import Dashboard from "../pages/dashboard/dashboard";
import { ErrorPage } from "../pages/error/error";
import FbAppeals from "../pages/appeals/fb_appeals";
import FbProcess from "../pages/feedback/feedback_client/fb_process";
import FbStart from "../pages/feedback/feedback_client/fb_start";
import FbSuccess from "../pages/feedback/feedback_client/fb_success";
import Feedbacks from "../pages/feedback/feedbacks";
import LoginPage from "../pages/auth/login";
import MonthlyExpenses from "../pages/paid_statistic/monthly_expenses";
import MonthlyRevenues from "../pages/paid_statistic/monthly_revenues";
import PaidOther from "../pages/paid/paid-other";
import PaidOtherGroup from "../pages/paid/paid-other-group";
import PaidServer from "../pages/server/paid-server";
import PaidSuppliers from "../pages/suppler/paid-supplier";
import Payments from "../pages/payment/payment";
import PriceCurant from "../pages/sale/price-curant";
import Product from "../pages/products/product";
import ProductGroup from "../pages/products/product-group";
import ProductUnit from "../pages/products/product-unit";
import Products from "../pages/products/products";
import ProtectedRoute from "./protected-route";
import Sale from "../pages/sale/sale";
import SaleCredit from "../pages/sale/sale-credit";
import Sales from "../pages/sale/sales";
import SalesFormPage from "../pages/sale/ui/sales-form-page";
import Server from "../pages/server/server";
import Servers from "../pages/server/servers";
import SimCardDetail from "../pages/simcard/simcard-detail";
import SimCards from "../pages/simcard/simcards";
import Sms from "../pages/sms/sms";
import Subscribe from "../pages/subscribe/subscribe";
import Subscribes from "../pages/subscribe/subscribes";
import Supplier from "../pages/suppler/supplier";
import SupplierCredit from "../pages/suppler/supplier-credit";
import SupplierOverPaid from "../pages/suppler/supplier-over-paid";
import Suppliers from "../pages/suppler/suppliers";
import { TokenManager } from "../config/token-manager";
import Users from "../pages/users/users";

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
            path: "clients-over-paid",
            element: <ClientsOverPaid />,
          },
          {
            path: "clients-credit",
            element: <ClientsCredit />,
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
            path: "price-curant",
            element: <PriceCurant />,
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
            path: "supplier-credit",
            element: <SupplierCredit />,
          },
          {
            path: "supplier-over-paid",
            element: <SupplierOverPaid />,
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
            path: "arrived-products",
            element: <ArrivedProducts />,
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
            path: "arriveds-credit",
            element: <ArrivedsCredit />,
          },
          {
            path: "sales",
            element: <Sales />,
          },
          {
            path: "sales-credit",
            element: <SaleCredit />,
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
            path: "paid-other",
            element: <PaidOther />,
          },
          {
            path: "paid-other-group",
            element: <PaidOtherGroup />,
          },
          {
            path: "paid-server",
            element: <PaidServer />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "monthly-revenues",
            element: <MonthlyRevenues />,
          },
          {
            path: "monthly-expenses",
            element: <MonthlyExpenses />,
          },
          {
            path: "monthly-arrears",
            element: <MonthlyRevenues />,
          },
          {
            path: "feedbacks",
            element: <Feedbacks />,
          },
          {
            path: "sms",
            element: <Sms />,
          },
          {
            path: "simcards",
            element: <SimCards />,
          },
          {
            path: "simcard/:id",
            element: <SimCardDetail />,
          },
          {
            path: "appeals",
            element: <Appeals />,
          },
          {
            path: "appeal/:id",
            element: <Appeal />,
          },
          {
            path: "fb/appeals",
            element: <FbAppeals />,
          },
          {
            path: "fb/start/:alias",
            element: <FbStart />,
          },
          {
            path: "fb/process/:alias",
            element: <FbProcess />,
          },
          {
            path: "success",
            element: <FbSuccess />,
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
