import { Menu, Layout, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useMemo } from "react";
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
import Logo from "../../public/LogoMbos.svg";
import { TokenManager } from "../config/token-manager";

const { Sider } = Layout;

const menuItems = [
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
        label: "Mijozlar ro‘yxati",
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
    key: "products-group",
    label: "Mahsulotlar",
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
    key: "suppliers-group",
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
    label: "Kirimlar",
    icon: <InboxOutlined />,
  },
  {
    key: "/sales",
    label: "Sotuvlar",
    icon: <DollarCircleOutlined />,
  },
  {
    key: "/subscribes",
    label: "Obunalar",
    icon: <TagsOutlined />,
  },
  {
    key: "/paid-clients",
    label: "To'langan mijozlar",
    icon: <DollarCircleOutlined />,
  },
];

interface Props {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

export default function SiderMenu({ collapsed, setCollapsed }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedKey = useMemo(() => {
    const currentPath = location.pathname;
    const flatKeys = menuItems.flatMap((item) =>
      item.children ? item.children.map((child) => child.key) : item.key
    );
    const matchedKey = flatKeys.find((key) => currentPath.startsWith(key));
    return [matchedKey || currentPath];
  }, [location.pathname]);

  const openKeys = useMemo(() => {
    const match = menuItems.find((item) =>
      item.children?.some((child) => child.key === location.pathname)
    );
    return match ? [match.key] : [];
  }, [location.pathname]);

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      TokenManager.clearTokens();
      message.success("Tizimdan chiqdingiz");
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
      <div className="flex items-center justify-center py-4 px-3">
        {!collapsed && <img src={Logo} alt="Logo" className="max-w-full" />}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKey}
        defaultOpenKeys={openKeys}
        onClick={handleMenuClick}
        items={menuItems}
      />
    </Sider>
  );
}
