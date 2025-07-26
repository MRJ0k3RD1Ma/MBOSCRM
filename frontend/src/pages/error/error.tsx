import { Button, Result } from "antd";
import { useRouteError, useNavigate } from "react-router-dom";

export function ErrorPage() {
  const error: any = useRouteError();
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Kechirasiz, bunday sahifa topilmadi."
      extra={
        <Button type="primary" onClick={handleBackHome}>
          Bosh sahifaga qaytish
        </Button>
      }
    >
      {error?.message && (
        <div style={{ marginTop: "16px", color: "gray" }}>
          <strong>Xatolik:</strong> {error.message}
        </div>
      )}
    </Result>
  );
}
