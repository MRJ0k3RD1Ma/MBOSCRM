import { useState } from "react";
import {
  Button,
  Card,
  Dropdown,
  Input,
  Space,
  Table,
  Tooltip,
  type MenuProps,
} from "antd";

import { PlusOutlined, MoreOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PaymentFormModal from "./ui/payment-form-modal";
import {
  useCreatePayment,
  useDeletePayment,
  useGetAllPayments,
  useUpdatePayment,
  type Payment,
} from "../../config/queries/payment/payment-querys";

export default function Payments() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Payment | null>(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading } = useGetAllPayments({
    page,
    limit,
    ...(search ? { name: search } : {}),
  });

  const createPayment = useCreatePayment();
  const updatePayment = useUpdatePayment();
  const deletePayment = useDeletePayment();

  const onSubmit = (values: { name: string; icon: string }) => {
    if (editing) {
      updatePayment.mutate({ id: editing.id, ...values });
    } else {
      createPayment.mutate(values);
    }
    setOpen(false);
    setEditing(null);
  };

  const handleEdit = (row: Payment) => {
    setEditing(row);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    deletePayment.mutate(id);
  };

  const columns = [
    { title: "Nomi", dataIndex: "name" },
    { title: "Ikon", dataIndex: "icon" },
    {
      title: "Amallar",
      key: "actions",
      render: (_: any, row: Payment) => {
        const items: MenuProps["items"] = [
          {
            key: "edit",
            label: "Tahrirlash",
            onClick: () => handleEdit(row),
          },
          {
            key: "delete",
            label: "O‘chirish",
            danger: true,
            onClick: () => handleDelete(row.id),
          },
        ];
        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Tooltip title="Boshqarish">
              <Button icon={<MoreOutlined />} />
            </Tooltip>
          </Dropdown>
        );
      },
    },
  ];

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

      <Table
        columns={columns}
        dataSource={data?.data || []}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total,
          onChange: (page) => setPage(page),
        }}
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
