import { Button } from "antd";
import { useTheme } from "../../hooks/use-theme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme}>
      {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
    </Button>
  );
}
