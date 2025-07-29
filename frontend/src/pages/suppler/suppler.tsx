import { useNavigate, useParams } from "react-router-dom";
import { Card, Descriptions, Button, Popconfirm, message, Spin } from "antd";
import { useState } from "react";
import {
  useDeleteSupplier,
  useGetSupplierById,
  useUpdateSupplier,
  type CreateSupplierInput,
} from "../../config/queries/supplier/supplier-querys";
import SupplierFormModal from "./ui/supplier-form-modal";

export default function Supplier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const supplierId = Number(id);

  const { data: supplier, isLoading } = useGetSupplierById(supplierId);
  const deleteSupplier = useDeleteSupplier();
  const updateSupplier = useUpdateSupplier();

  const [editOpen, setEditOpen] = useState(false);

  const handleDelete = () => {
    deleteSupplier.mutate(supplierId, {
      onSuccess: () => {
        message.success("Yetkazib beruvchi o‘chirildi");
        navigate("/supplier");
      },
    });
  };

  const handleUpdate = (values: CreateSupplierInput) => {
    updateSupplier.mutate({ id: supplierId, ...values });
    setEditOpen(false);
  };

  if (isLoading || !supplier) {
    return <Spin size="large" />;
  }

  return (
    <Card
      title={`Yetkazib beruvchi: ${supplier.name}`}
      extra={
        <>
          <Button onClick={() => setEditOpen(true)} style={{ marginRight: 8 }}>
            O‘zgartirish
          </Button>
          <Popconfirm
            title="Haqiqatan o‘chirmoqchimisiz?"
            onConfirm={handleDelete}
          >
            <Button danger>O‘chirish</Button>
          </Popconfirm>
        </>
      }
    >
      <Descriptions bordered column={1} size="middle">
        <Descriptions.Item label="Nomi">{supplier.name}</Descriptions.Item>
        <Descriptions.Item label="Telefon">{supplier.phone}</Descriptions.Item>
        <Descriptions.Item label="Qo‘shimcha telefon">
          {supplier.phoneTwo || "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Izoh">
          {supplier.description || "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Balans">
          {supplier.balance ?? 0}
        </Descriptions.Item>
      </Descriptions>

      <SupplierFormModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSubmit={handleUpdate}
        initialValues={supplier}
      />
    </Card>
  );
}
