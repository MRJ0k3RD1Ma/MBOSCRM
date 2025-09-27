const THEME_KEY = "app-theme"

export type ThemeType = "light" | "dark";

export default class ThemeController {
    
    static getCurrent(): ThemeType {
        return localStorage.getItem(THEME_KEY) as ThemeType || "light"
    }

    static setTheme(theme: ThemeType) {
        localStorage.setItem(THEME_KEY, theme)
        document.documentElement.setAttribute("data-theme", theme);
    }

    static toggleTheme(): ThemeType {
        const current = this.getCurrent()
        let newTheme: ThemeType = "light"
        switch(current) {
            case "dark": {
                newTheme = "light"
                break
            }
            case "light": {
                newTheme = "dark"
                break
            }
        }
        return newTheme
    }
}