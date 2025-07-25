import { Navigate, Outlet } from "react-router-dom";
import { Spin } from "antd";
import { TokenManager } from "../config/token-manager";
import { useAuthCheck } from "../hooks/auth/use-auth-check";

export default function ProtectedRoute() {
  const token = TokenManager.getAccessToken();
  const { data, isLoading, isError } = useAuthCheck(token);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !data?.success) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
