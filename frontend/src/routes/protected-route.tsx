import { Navigate, Outlet } from "react-router-dom";
import { Spin } from "antd";
import { useAuthCheck } from "../hooks/auth/use-auth-check";
import { TokenManager } from "../config/token-manager";

export default function ProtectedRoute() {
  const token = TokenManager.getAccessToken();
  const { data, isLoading } = useAuthCheck(token);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const isAuthenticated = data?.success === true;

  if (!isAuthenticated) {
    TokenManager.clearTokens();
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
