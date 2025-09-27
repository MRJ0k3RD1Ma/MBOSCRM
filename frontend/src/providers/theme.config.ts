import type { MappingAlgorithm, ThemeConfig } from "antd";

import type { AliasToken } from "antd/es/theme/interface/alias";
import type { ThemeType } from "./theme.controller";
import { theme as antdTheme } from "antd";

export const useThemeConfig = (theme: ThemeType): ThemeConfig => {
   return {
    algorithm: getAlgorith(theme),
    token: getToken(theme),
    components: getComponents(theme)
  };
}

const getAlgorith = (theme: ThemeType): MappingAlgorithm | MappingAlgorithm[] => {
    return theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm;
}

const getToken = (theme: ThemeType): Partial<AliasToken> => {
    return theme === "dark"
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
          }
}

const getComponents = (theme: ThemeType) => {
    return theme === "dark"? {
            Layout: {
              siderBg: "#001529",
              headerBg: "#0a0f1e",
              bodyBg: "#0a0f1e",
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
            Modal: {
              contentBg: "#0f172a",
              headerBg: "#0f172a",
              titleColor: "#e2e8f0",
              colorText: "#e2e8f0",
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
            Modal: {
              contentBg: "#ffffff",
              headerBg: "#ffffff",
              titleColor: "#000000",
              colorText: "#000000",
            },
          }
}