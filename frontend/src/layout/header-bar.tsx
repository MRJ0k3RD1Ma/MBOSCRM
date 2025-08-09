import { Layout, Typography, Space, Avatar, Dropdown } from "antd";
import { DownOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { message } from "antd";
import { useTheme } from "../hooks/use-theme";
import { TokenManager } from "../config/token-manager";
import ThemeToggle from "../components/theme/theme-toggle";

const { Header } = Layout;
const { Title } = Typography;

interface Props {
  pageTitle: string;
}

export default function HeaderBar({ pageTitle }: Props) {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      TokenManager.clearTokens();
      message.success("Siz tizimdan chiqdingiz");
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  const profileMenu = {
    items: [
      // { key: "profile", icon: <UserOutlined />, label: "Profil" },
      { key: "logout", icon: <LogoutOutlined />, label: "Chiqish" },
    ],
    onClick: handleMenuClick,
  };

  return (
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
  );
}
