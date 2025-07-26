import { Layout, Menu } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import ThemeToggle from "../components/theme/theme-toggle";
import { Outlet } from "react-router-dom";

const { Sider, Content } = Layout;

export default function AppLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="dark" width={220}>
        <div
          style={{
            padding: 16,
            textAlign: "center",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          LOGO
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Bosh sahifa
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Foydalanuvchilar
          </Menu.Item>
        </Menu>
        <div
          style={{
            position: "absolute",
            bottom: 24,
            width: "100%",
            textAlign: "center",
          }}
        >
          <ThemeToggle />
        </div>
      </Sider>

      <Layout>
        <Content style={{ margin: "16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
