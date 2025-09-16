import { Button, Dropdown, message, Table, type MenuProps } from "antd";
import { indexColumn } from "../../../components/tables/indexColumn";
import {
  useDeleteClientType,
  useGetAllClientTypes,
} from "../../../config/queries/clients/client-type-querys";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
export default function ClientTypesTable({
  search,
  filters,
  setSelected,
  setModalOpen,
}: {
  search: string;
  filters: Record<string, any>;
  setSelected: (selected: { id: number; name: string } | null) => void;
  setModalOpen: (modalOpen: boolean) => void;
}) {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useGetAllClientTypes({
    page,
    limit: 10,
    ...(search ? { code: search } : {}),
    ...filters,
  });
  const deleteClientType = useDeleteClientType();

  useEffect(() => {
    refetch();
  }, [filters]);

  const handleDelete = async (record: any) => {
    try {
      await deleteClientType.mutateAsync(record.id);
    } catch {
      message.error("O‘chirishda xatolik");
    }
  };

  const columns = [
    indexColumn(page, 10),
    {
      title: "Turi nomi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amallar",
      key: "actions",
      align: "right" as const,
      render: (_: any, record: any) => {
        const items: MenuProps["items"] = [
          {
            key: "edit",
            icon: <EditOutlined />,
            label: "Tahrirlash",
            onClick: () => {
              setSelected({ id: record.id, name: record.name });
              setModalOpen(true);
            },
          },
          {
            key: "delete",
            icon: <DeleteOutlined />,
            label: "O‘chirish",
            danger: true,
            onClick: () => handleDelete(record),
          },
        ];

        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="client-types-table">
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={data?.data || []}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: 10,
          total: data?.total,
          onChange: setPage,
        }}
      />
    </div>
  );
}
