import { Button, Space } from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { useDeleteSale } from "../../../config/queries/sale/sale-querys";
import { useNavigate } from "react-router-dom";

export default function SaleHeaderButtons({
  currentId,
  sale,
  setIsClosed,
  setPaidOpen,
}: {
  currentId: number | null;
  sale: any;
  setIsClosed: (isClosed: boolean) => void;
  setPaidOpen: (paidOpen: boolean) => void;
}) {
  const navigate = useNavigate();
  const deleteSale = useDeleteSale();

  const handleDelete = () => {
    if (!currentId) return;
    deleteSale.mutate(currentId, {
      onSuccess: () => {
        navigate("/sale");
      },
    });
  };
  return (
    <Space>
      {sale?.state === "RUNNING" && (
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => setIsClosed(true)}
        >
          Tugugatish
        </Button>
      )}
      <Button onClick={() => navigate(`/sale/edit/${currentId}`)}>
        O‘zgartirish
      </Button>
      <Button danger onClick={handleDelete}>
        O‘chirish
      </Button>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setPaidOpen(true);
        }}
      >
        Yangi to‘lov qo‘shish
      </Button>
    </Space>
  );
}
