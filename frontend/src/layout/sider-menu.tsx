import { Menu, Layout } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useMemo } from "react";
import Logo from "../../public/LogoMbos.svg";
import { message } from "antd";
import { TokenManager } from "../config/token-manager";
import {
  HomeOutlined,
  UsergroupAddOutlined,
  FolderOpenOutlined,
  UserOutlined,
  ShoppingOutlined,
  DollarCircleOutlined,
  TagsOutlined,
  NumberOutlined,
  InboxOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;

const pages = [
  {
    key: "/dashboard",
    label: "Bosh sahifa",
    icon: <HomeOutlined />,
  },
  {
    key: "clients-group",
    label: "Mijozlar bo‘limi",
    icon: <UsergroupAddOutlined />,
    children: [
      {
        key: "/clients",
        label: "Barcha mijozlar",
        icon: <UserOutlined />,
      },
      {
        key: "/client-type",
        label: "Mijoz turlari",
        icon: <TagsOutlined />,
      },
    ],
  },
  {
    key: "products",
    label: "Mahsulotlar bo‘limi",
    icon: <ShoppingOutlined />,
    children: [
      {
        key: "/products",
        label: "Mahsulotlar ro‘yxati",
        icon: <ShoppingOutlined />,
      },
      {
        key: "/product-group",
        label: "Mahsulot guruhlari",
        icon: <FolderOpenOutlined />,
      },
      {
        key: "/product-unit",
        label: "O‘lchov birliklari",
        icon: <NumberOutlined />,
      },
    ],
  },
  {
    key: "suppliers",
    label: "Ta'minotchilar",
    icon: <UsergroupAddOutlined />,
    children: [
      {
        key: "/suppliers",
        label: "Ta'minotchilar ro‘yxati",
        icon: <UserOutlined />,
      },
      {
        key: "/paid-suppliers",
        label: "To‘lov qilinganlar",
        icon: <DollarCircleOutlined />,
      },
    ],
  },
  {
    key: "/payment",
    label: "To‘lov turlari",
    icon: <DollarCircleOutlined />,
  },
  {
    key: "/arriveds",
    label: "Kirimlar (ombor)",
    icon: <InboxOutlined />,
  },
];

interface Props {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

export default function SiderMenu({ collapsed, setCollapsed }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedKey = location.pathname;

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
    } else {
      navigate(key);
    }
  };

  return (
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
          color: "#fff",
          fontWeight: "bold",
          width: "100%",
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
  );
}
