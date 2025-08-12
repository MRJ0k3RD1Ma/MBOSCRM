import { ConfigProvider, theme as antdTheme } from "antd";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { ThemeConfig } from "antd/es/config-provider/context";

export type ThemeType = "light" | "dark";

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    return (localStorage.getItem("app-theme") as ThemeType) || "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("app-theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const config: ThemeConfig = {
    algorithm:
      theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token:
      theme === "dark"
        ? {
            colorPrimary: "#1677ff",
            colorBgContainer: "#001529",
            colorBgLayout: "#0a0f1e",
            colorText: "#e2e8f0",
          }
        : {
            colorPrimary: "#1677ff",
            colorBgContainer: "#ffffff",
            colorBgLayout: "#f0f2f5",
            colorText: "#000000",
          },
    components:
      theme === "dark"
        ? {
            Layout: {
              siderBg: "#001529",
              headerBg: "#0a0f1e",
              bodyBg: "#000000",
              footerBg: "#0f172a",
            },
            Drawer: {
              colorText: "#e2e8f0",
              colorBgElevated: "#001529",
            },
            Table: {
              headerBg: "#1e293b",
              headerColor: "#e2e8f0",
            },
          }
        : {
            Layout: {
              bodyBg: "#ffffff",
            },
            Table: {
              headerBg: "#f1f5f9",
              headerColor: "#000000",
            },
          },
  };

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
