import ReactDOM from "react-dom/client";
import App from "./App";
import "antd/dist/reset.css";
import { ThemeProvider } from "./providers/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import "./global.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </QueryClientProvider>
);
