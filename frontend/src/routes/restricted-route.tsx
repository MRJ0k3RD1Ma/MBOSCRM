import { Navigate } from "react-router-dom";
import { TokenManager } from "../config/token-manager";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
}

export default function RestrictedRoute({ children }: Props) {
  const token = TokenManager.getAccessToken();

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
