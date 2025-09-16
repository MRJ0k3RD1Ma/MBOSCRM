import { Button, Dropdown, Table, Tooltip, type MenuProps } from "antd";

import {
  useDeletePayment,
  useGetAllPayments,
  type Payment,
} from "../../../config/queries/payment/payment-querys";
import { indexColumn } from "../../../components/tables/indexColumn";
import { useState } from "react";
import { MoreOutlined } from "@ant-design/icons";

export default function PaymenTable({
  page,
  setPage,
  search,
  setEditing,
  setOpen,
}: {
  page: number;
  setPage: (page: number) => void;
  search: string;
  setEditing: (payment: Payment | null) => void;
  setOpen: (open: boolean) => void;
}) {
  const [limit] = useState(10);
  const { data, isLoading } = useGetAllPayments({
    page,
    limit,
    ...(search ? { name: search } : {}),
  });
  const deletePayment = useDeletePayment();

  const handleEdit = (row: Payment) => {
    setEditing(row);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    deletePayment.mutate(id);
  };
  const columns = [
    indexColumn(page, limit),
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
    <div className="payment-table">
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
    </div>
  );
}
