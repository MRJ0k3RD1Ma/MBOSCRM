import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import BreadcrumbNav, { usePageTitle } from "./breadcrumb-nav";
import SiderMenu from "./sider-menu";
import HeaderBar from "./header-bar";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const pageTitle = usePageTitle();

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
