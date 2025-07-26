import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { TokenManager } from "../../../config/token-manager";

export default function LogoutBtn() {
  const navigate = useNavigate();

  const handleLogout = () => {
    TokenManager.clearTokens();
    navigate("/login");
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
