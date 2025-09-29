import { ConfigProvider } from "antd";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { ThemeType } from "./theme.controller";
import ThemeController from "./theme.controller";
import { useThemeConfig } from "./theme.config";

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(() => ThemeController.getCurrent());

  const toggleTheme = () => {
    const theme = ThemeController.toggleTheme()
    setTheme(theme);
  };

  const config = useThemeConfig(theme)

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ConfigProvider theme={config}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
};
