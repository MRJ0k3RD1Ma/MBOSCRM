import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Space,
  message,
  Breadcrumb,
  Typography,
} from "antd";
import {
  HomeOutlined,
  UsergroupAddOutlined,
  FolderOpenOutlined,
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
  ProductFilled,
  UnderlineOutlined,
} from "@ant-design/icons";
import ThemeToggle from "../components/theme/theme-toggle";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import Logo from "../../public/LogoMbos.svg";
import { useTheme } from "../hooks/use-theme";
import { useState, useMemo } from "react";
import { TokenManager } from "../config/token-manager";

const { Sider, Content, Header } = Layout;
const { Title } = Typography;

const pages = [
  {
    key: "/dashboard",
    label: "Bosh sahifa",
    icon: <HomeOutlined />,
  },
  {
    key: "clients-group",
    label: "Mijozlar",
    icon: <UsergroupAddOutlined />,
    children: [
      {
        key: "/clients",
        label: "Mijozlar ma'lumotlari",
        icon: <UsergroupAddOutlined />,
      },
      {
        key: "/client-type",
        label: "Mijozlar turlari",
        icon: <FolderOpenOutlined />,
      },
    ],
  },
  {
    key: "products",
    label: "Mahsulotlar",
    icon: <ProductFilled />,
    children: [
      {
        key: "/products",
        label: "Mahsulotlar",
        icon: <ProductFilled />,
      },
      {
        key: "/product-group",
        label: "Mahsulot guruhlari",
        icon: <FolderOpenOutlined />,
      },
      {
        key: "/product-unit",
        label: "Mahsulot o'lchov birligi",
        icon: <UnderlineOutlined />,
      },
    ],
  },
];

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  const selectedKey = location.pathname;

  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const nameMap: Record<string, string> = {
    dashboard: "Bosh sahifa",
    clients: "Mijozlar",
    "client-type": "Mijozlar turlari",
    client: "Mijoz tafsilotlari",
    products: "Mahsulotlar",
    "product-group": "Mahsulot guruhlari",
    "product-unit": "Mahsulot o'lchov birligi",
    profile: "Profil",
    product: "Mahsulat tafsilotlari",
  };
  const breadcrumbItems = [
    <Breadcrumb.Item key="dashboard">
      <Link to="/dashboard">Bosh sahifa</Link>
    </Breadcrumb.Item>,
    ...pathSnippets.map((path, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      const name = nameMap[path] || path;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{name}</Link>
        </Breadcrumb.Item>
      );
    }),
  ];

  const pageTitle =
    nameMap[pathSnippets[pathSnippets.length - 1]] || "Dashboard";

  const openKey = useMemo(() => {
    const match = pages.find((page) =>
      page.children?.some((child) => child.key === location.pathname)
    );
    return match ? [match.key] : [];
  }, [location.pathname]);

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      TokenManager.clearTokens();
      message.success("Siz tizimdan chiqdingiz");
      navigate("/login");
    } else if (key === "profile") {
      navigate("/profile");
    } else {
      navigate(key);
    }
  };

  const profileMenu = {
    items: [
      {
        key: "profile",
        icon: <UserOutlined />,
        label: "Profil",
      },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Chiqish",
      },
    ],
    onClick: handleMenuClick,
  };

  return (
    <Layout style={{ height: "100vh" }} className="app-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme="dark"
        width={280}
        style={{
          position: "fixed",
          height: "100vh",
          left: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            padding: 16,
            textAlign: "center",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          {!collapsed && (
            <img src={Logo} alt="Logo" style={{ maxWidth: "100%" }} />
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          defaultOpenKeys={openKey}
          onClick={handleMenuClick}
          items={pages}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 280, transition: "0.2s" }}>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 24px",
            background: theme === "dark" ? "#001529" : "#fff",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 1,
          }}
        >
          <Title level={3} style={{ margin: 0 }}>
            {pageTitle}
          </Title>
          <Space size="large">
            <ThemeToggle />
            <Dropdown menu={profileMenu} placement="bottomRight">
              <Space style={{ cursor: "pointer" }}>
                <Avatar icon={<UserOutlined />} />
                <DownOutlined style={{ fontSize: 12 }} />
              </Space>
            </Dropdown>
          </Space>
        </Header>

        <Breadcrumb style={{ margin: "16px 24px 0" }}>
          {breadcrumbItems}
        </Breadcrumb>

        <Content style={{ margin: "16px 24px 24px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
