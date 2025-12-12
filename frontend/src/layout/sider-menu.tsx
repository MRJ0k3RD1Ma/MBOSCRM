import {
  AppstoreOutlined,
  CheckSquareOutlined,
  CloudServerOutlined,
  ClusterOutlined,
  ContainerOutlined,
  CreditCardOutlined,
  DollarCircleOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  HomeOutlined,
  InboxOutlined,
  MessageOutlined,
  NumberOutlined,
  ProfileOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  SolutionOutlined,
  TagsOutlined,
  TeamOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Layout, Menu, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import Logo from "../../public/LogoMbos.svg";
import LogoM from "../../public/LogoM.png";
import { TokenManager } from "../config/token-manager";
import { useMemo } from "react";

const { Sider } = Layout;
const menuItems = [
  {
    key: "/dashboard",
    label: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    key: "/reports",
    label: "Hisobotlar",
    icon: <FileTextOutlined />,
  },
  {
    key: "/subscribes",
    label: "Obunalar",
    icon: <TagsOutlined />,
  },
  {
    key: "/sales",
    label: "Sotuvlar",
    icon: <ShoppingCartOutlined />,
    children: [
      {
        key: "/sale/create",
        label: "Sotuvni amalga oshirish",
        icon: <ShoppingOutlined />,
      },
      {
        key: "/sales",
        label: "Sotilgan mahsulotlar",
        icon: <FileDoneOutlined />,
      },
      {
        key: "/sales-credit",
        label: "Qarzdorliklar",
        icon: <CreditCardOutlined />,
      },
      {
        key: "/price-curant",
        label: "Prayskurant",
        icon: <FileTextOutlined />,
      },
    ],
  },
  {
    key: "/paid-clients-group",
    label: "Kassa",
    icon: <WalletOutlined />,
    children: [
      {
        key: "/paid-clients",
        label: "Mijoz to’lovlari",
        icon: <UserOutlined />,
      },
      {
        key: "/paid-suppliers",
        label: "Yetkazuvchilarga to'langanlar",
        icon: <TeamOutlined />,
      },
      {
        key: "/paid-other",
        label: "Boshqa to'lovlar",
        icon: <ContainerOutlined />,
      },
      {
        key: "/paid-server",
        label: "Server xarajatlari",
        icon: <CloudServerOutlined />,
      },
    ],
  },
  {
    key: "/arriveds-group",
    label: "Sklad",
    icon: <InboxOutlined />,
    children: [
      {
        key: "/arrived/create",
        label: "Mahsulot qabul qilish",
        icon: <ProfileOutlined />,
      },
      {
        key: "/arriveds",
        label: "Skladga qabul qilingan mahsulotlar",
        icon: <InboxOutlined />,
      },
      {
        key: "/arriveds-credit",
        label: "Qoldiqlar",
        icon: <CheckSquareOutlined />,
      },
    ],
  },
  {
    key: "/servers",
    label: "Serverlar",
    icon: <CloudServerOutlined />,
  },
  {
    key: "products-group",
    label: "Mahsulotlar",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "/products",
        label: "Mahsulotlar ro‘yxati",
        icon: <ShoppingOutlined />,
      },
      {
        key: "/product-group",
        label: "Mahsulot guruhlari",
        icon: <ClusterOutlined />,
      },
      {
        key: "/product-unit",
        label: "Mahsulot birliklari",
        icon: <NumberOutlined />,
      },
    ],
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
        key: "/clients-credit",
        label: "Qarzdorlar",
        icon: <CreditCardOutlined />,
      },
      {
        key: "/clients-over-paid",
        label: "Ortiqcha to'laganlar",
        icon: <DollarCircleOutlined />,
      },
      {
        key: "/client-type",
        label: "Mijoz turlari",
        icon: <SolutionOutlined />,
      },
    ],
  },
  {
    key: "suppliers-group",
    label: "Yetkazuvchilar",
    icon: <TeamOutlined />,
    children: [
      {
        key: "/suppliers",
        label: "Yetkazib beruvchilar ro’yhati",
        icon: <UserOutlined />,
      },
      {
        key: "/paid-suppliers",
        label: "To‘lov qilinganlar",
        icon: <WalletOutlined />,
      },
      {
        key: "/arrived-products",
        label: "Kelgan mahsulotlar",
        icon: <InboxOutlined />,
      },
      {
        key: "/supplier-credit",
        label: "Mavjud qarzdorlik",
        icon: <CreditCardOutlined />,
      },
      {
        key: "/supplier-over-paid",
        label: "Ortiqcha to’lovlar",
        icon: <DollarCircleOutlined />,
      },
    ],
  },
  {
    key: "/feedbacks",
    label: "Fikr-mulohazalar",
    icon: <SolutionOutlined />,
  },
  {
    key: "/sms",
    label: "SMS xabarlar",
    icon: <MessageOutlined />,
  },
  {
    key: "/simcards",
    label: "Simkartalar",
    icon: <NumberOutlined />,
  },
  {
    key: "/appeals",
    label: "Murojatlar",
    icon: <FileTextOutlined />,
  },
  {
    key: "setting-group",
    label: "Sozlamalar",
    icon: <SettingOutlined />,
    children: [
      {
        key: "/users",
        label: "Foydalanuvchilar ro'yhati",
        icon: <TeamOutlined />,
      },
      {
        key: "/paid-other-group",
        label: "Boshqa xarajat guruhlari",
        icon: <ContainerOutlined />,
      },
      {
        key: "/payment",
        label: "To‘lov turlari",
        icon: <CreditCardOutlined />,
      },
    ],
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
      item.children ? item.children.map((child) => child.key) : [item.key]
    );

    const exactMatch = flatKeys.find((key) => key === currentPath);
    if (exactMatch) return [exactMatch];

    const partialMatch = flatKeys.find((key) => currentPath.startsWith(key));
    return [partialMatch || currentPath];
  }, [location.pathname]);

  const openKeys = useMemo(() => {
    const match = menuItems.find((item) =>
      item.children?.some((child) => location.pathname.startsWith(child.key))
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
      width={290}
      style={{
        position: "fixed",
        height: "100vh",
        left: 0,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="flex items-center justify-center py-4 px-3 w-full !h-[90px] relative">
        <img
          src={Logo}
          alt="Logo"
          className={`
             absolute max-w-full transition-opacity duration-300 
             ${collapsed ? "opacity-0" : "opacity-100"}
          `}
        />
        <img
          src={LogoM}
          alt="Logo"
          className={`
              absolute w-[45px] transition-opacity duration-300
             ${collapsed ? "opacity-100" : "opacity-0"}
         `}
        />
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKey}
        defaultOpenKeys={openKeys}
        onClick={handleMenuClick}
        items={menuItems}
        style={{
          height: "calc(100vh - 140px)",
          overflowY: "auto",
        }}
      />
    </Sider>
  );
}
