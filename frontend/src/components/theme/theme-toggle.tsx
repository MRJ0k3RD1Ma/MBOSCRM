import { Switch } from "antd";
import { useTheme } from "../../hooks/use-theme";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Switch
        checked={theme === "dark"}
        onChange={toggleTheme}
        checkedChildren={<MoonOutlined />}
        unCheckedChildren={<SunOutlined />}
        style={{ backgroundColor: theme === "dark" ? "#001529" : "#ffd666" }}
      />
    </div>
  );
}
