import ReactDOM from "react-dom/client";
import App from "./App";
import "antd/dist/reset.css";
import { ThemeProvider } from "./providers/theme-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
