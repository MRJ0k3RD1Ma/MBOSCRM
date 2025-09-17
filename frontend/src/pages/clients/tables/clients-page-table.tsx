import { Button, Dropdown, Table, Tooltip, type MenuProps } from "antd";

import {
  useDeleteClient,
  useGetAllClients,
  type Client,
} from "../../../config/queries/clients/clients-querys";
import dayjs from "dayjs";
import { indexColumn } from "../../../components/tables/indexColumn";
import { MoreOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ClientsPageTable({
  page,
  search,
  filters,
  setPage,
  setEditing,
  form,
  setOpen,
}: {
  page: number;
  search: string;
  filters: Record<string, any>;
  setPage: (page: number) => void;
  setEditing: (client: Client | null) => void;
  form: any;
  setOpen: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const [limit] = useState(10);

  const { data, isLoading } = useGetAllClients({
    page,
    limit,
    ...(search ? { name: search } : {}),
    ...filters,
  });

  const deleteClient = useDeleteClient();

  const handleEdit = (client: Client) => {
    setEditing(client);
    form.setFieldsValue(client);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteClient.mutate(id);
  };
  const columns = [
    indexColumn(page, limit),
    { title: "Nomi", dataIndex: "name" },
    { title: "INN", dataIndex: "inn" },
    { title: "Telefon", dataIndex: "phone" },
    { title: "Mijoz turi", dataIndex: ["ClientType", "name"] },
    {
      title: "Balans",
      dataIndex: "balance",
      render: (balance: number) =>
        balance ? balance.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "So'ngi o'zgarish",
      dataIndex: "updatedAt",
      render: (text: string) =>
        text ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD") : "—",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, row: Client) => {
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
          {
            key: "view",
            label: "Profilga o‘tish",
            onClick: () => navigate(`/client/${row.id}`),
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
    <div className="clients-page-table">
      <Table
        columns={columns}
        dataSource={data?.data || []}
        loading={isLoading}
        rowKey="id"
        onRow={(record) => ({
          onClick: (e) => {
            if (
              (e.target as HTMLElement).closest("button") ||
              (e.target as HTMLElement).closest("svg")
            ) {
              return;
            }
            navigate(`/client/${record.id}`);
          },
        })}
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
