const THEME_KEY = "app-theme";

export type ThemeType = "light" | "dark";

export default class ThemeController {
    static getCurrent(): ThemeType {
        return (localStorage.getItem(THEME_KEY) as ThemeType) || "dark"; 
    }

    static setTheme(theme: ThemeType) {
        localStorage.setItem(THEME_KEY, theme);
        document.documentElement.setAttribute("data-theme", theme);
    }

    static toggleTheme(): ThemeType {
        const current = this.getCurrent();
        let newTheme: ThemeType = current === "dark" ? "light" : "dark";
        this.setTheme(newTheme);
        return newTheme;
    }
}
