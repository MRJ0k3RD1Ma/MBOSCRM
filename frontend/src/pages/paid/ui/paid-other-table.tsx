import { Button, Dropdown, Table, Tooltip, type MenuProps } from "antd";
import {
  useDeletePaidOther,
  useGetAllPaidOthers,
  type PaidOther,
} from "../../../config/queries/paid/paid-other";
import { MoreOutlined } from "@ant-design/icons";
import { indexColumn } from "../../../components/tables/indexColumn";
import dayjs from "dayjs";
import { useState } from "react";

export default function PaidOtherTable({
  page,
  filters,
  setEditing,
  form,
  setOpen,
  setPage,
}: {
  page: number;
  filters: Record<string, any>;
  setEditing: (paidOther: PaidOther | null) => void;
  form: any;
  setOpen: (open: boolean) => void;
  setPage: (page: number) => void;
}) {
  const [limit] = useState(10);

  const { data, isLoading } = useGetAllPaidOthers({
    page,
    limit,
    ...filters,
  });
  const deletePaidOther = useDeletePaidOther();

  const handleEdit = (row: PaidOther) => {
    setEditing(row);
    form.setFieldsValue({
      ...row,
      paidDate: row.paidDate ? dayjs(row.paidDate) : undefined,
    });
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    deletePaidOther.mutate(String(id));
  };

  const columns = [
    indexColumn(page, limit),
    {
      title: "Guruh",
      dataIndex: "groupId",
      render: (_: any, row: PaidOther) => row.group?.name || "–",
    },
    {
      title: "Turi",
      dataIndex: "type",
      render: (type: PaidOther["type"]) =>
        type === "INCOME" ? "Kirim" : "Chiqim",
    },
    {
      title: "To‘lov miqdori",
      dataIndex: "price",
      render: (priceCount: number) =>
        priceCount ? priceCount.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "To‘langan sana",
      dataIndex: "paidDate",
      render: (text: string) => (text ? dayjs(text).format("YYYY-MM-DD") : "–"),
    },
    { title: "Izoh", dataIndex: "description" },
    {
      title: "Amallar",
      key: "actions",
      render: (_: any, row: PaidOther) => {
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
          <div onClick={(e) => e.stopPropagation()}>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Tooltip title="Boshqarish">
                <Button icon={<MoreOutlined />} />
              </Tooltip>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  return (
    <div className="paid-other-table">
      <Table
        columns={columns}
        dataSource={data?.data || []}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total || 0,
          onChange: (page) => setPage(page),
        }}
      />
    </div>
  );
}
