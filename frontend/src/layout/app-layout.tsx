import BreadcrumbNav, { usePageTitle } from "./breadcrumb-nav";
import { Outlet, useLocation } from "react-router-dom";

import HeaderBar from "./header-bar";
import { Layout } from "antd";
import SiderMenu from "./sider-menu";
import { useState } from "react";

const fullPageRoutes = [
  "/fb/appeals",
  "/fb/start",
  "/fb/process",
  "/success"
]

export default function AppLayout() {
  const pageTitle = usePageTitle();
  const location = useLocation();
  
  const [collapsed, setCollapsed] = useState(false);

  if (fullPageRoutes.some(route => location.pathname.startsWith(route))) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <Outlet />
      </div>
    );
  }

  return (
    <Layout style={{ height: "100vh" }} className="app-layout">
      <SiderMenu collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout style={{ marginLeft: collapsed ? 80 : 280, transition: "0.2s" }}>
        <HeaderBar pageTitle={pageTitle} />
        <BreadcrumbNav />
        <Layout.Content style={{ margin: "16px 24px 24px" }}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
