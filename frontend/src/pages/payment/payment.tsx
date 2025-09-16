import { useState } from "react";
import { Button, Card, Input, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PaymentFormModal from "./ui/payment-form-modal";
import {
  useCreatePayment,
  useUpdatePayment,
  type Payment,
} from "../../config/queries/payment/payment-querys";
import PaymenTable from "./ui/payment-table";

export default function Payments() {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Payment | null>(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const createPayment = useCreatePayment();
  const updatePayment = useUpdatePayment();

  const onSubmit = (values: { name: string; icon: string }) => {
    if (editing) {
      updatePayment.mutate({ id: editing.id, ...values });
    } else {
      createPayment.mutate(values);
    }
    setOpen(false);
    setEditing(null);
  };

  return (
    <Card>
      <Space
        direction="horizontal"
        style={{
          width: "100%",
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Input.Search
          placeholder="To‘lov turi nomi bo‘yicha qidirish"
          allowClear
          enterButton
          onSearch={(val) => {
            setSearch(val);
            setPage(1);
          }}
          style={{ maxWidth: 300 }}
        />

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          Yangi to‘lov turi
        </Button>
      </Space>
      <PaymenTable
        page={page}
        setPage={setPage}
        search={search}
        setEditing={setEditing}
        setOpen={setOpen}
      />
      <PaymentFormModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSubmit={onSubmit}
        initialValues={editing || undefined}
      />
    </Card>
  );
}
