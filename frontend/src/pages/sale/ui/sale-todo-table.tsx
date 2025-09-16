import { Button, Dropdown, Table, Tooltip, type MenuProps } from "antd";

import type { ColumnsType } from "antd/es/table";
import { MoreOutlined } from "@ant-design/icons";
import { indexColumn } from "../../../components/tables/indexColumn";
import {
  useDeleteSaleTodo,
  useGetAllSaleTodo,
  type SaleTodo,
} from "../../../config/queries/sale/sale-todo-querys";
import { useState } from "react";
import dayjs from "dayjs";

export default function SaleTodoTable({
  id,
  setEditTodo,
  saleFeedback,
}: {
  id: string | undefined;
  setEditTodo: (todo: SaleTodo) => void;
  saleFeedback: any;
}) {
  const [pageSale, setPageSale] = useState(1);
  const limit = 5;

  const { data: saleTodo } = useGetAllSaleTodo({
    page: pageSale,
    limit,
    saleId: Number(id),
  });
  const deleteSaleTodo = useDeleteSaleTodo();

  const saleTodoColumns: ColumnsType<SaleTodo> = [
    indexColumn(pageSale, limit),
    {
      title: "Natija",
      dataIndex: "isComplated",
      render: (isComplated: boolean) => (isComplated ? "✓" : "✕"),
    },
    {
      title: "Sana",
      dataIndex: "updatedAt",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Qilingan ishlar",
      dataIndex: "name",
    },
  ];

  if (["TODO", "REJECT"].includes(saleFeedback?.data?.[0]?.state ?? "")) {
    saleTodoColumns.push({
      title: "Amallar",
      key: "actions",
      render: (_: any, row: SaleTodo) => {
        const items: MenuProps["items"] = [
          {
            key: "edit",
            label: "Tahrirlash",
            onClick: () => setEditTodo(row),
          },
          {
            key: "delete",
            label: "O‘chirish",
            danger: true,
            onClick: () => deleteSaleTodo.mutate(row.id),
          },
        ];

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Tooltip title="Boshqarish">
                <Button icon={<MoreOutlined />} />
              </Tooltip>
            </Dropdown>
          </div>
        );
      },
    });
  }
  return (
    <div className="sale-todo-table">
      <Table
        dataSource={saleTodo?.data || []}
        columns={saleTodoColumns}
        className="w-full"
        rowKey="id"
        pagination={{
          current: pageSale,
          pageSize: limit,
          total: saleTodo?.total || saleTodo?.data?.length || 0,
          onChange: setPageSale,
        }}
      />
    </div>
  );
}
