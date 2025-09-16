import { Button, Dropdown, message, Table, type MenuProps } from "antd";
import { indexColumn } from "../../../components/tables/indexColumn";
import {
  useDeletePaidOtherGroup,
  useGetAllPaidOtherGroups,
} from "../../../config/queries/paid/paid-other-group";
import { useEffect } from "react";
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
export default function PaidOtherGroupTable({
  filters,
  setFilters,
  setSelected,
  setModalOpen,
}: {
  filters: Record<string, any>;
  setFilters: any;
  setSelected: (group: { id: number; name: string } | null) => void;
  setModalOpen: (open: boolean) => void;
}) {
  const { data, isLoading, refetch } = useGetAllPaidOtherGroups(filters);
  const deleteClientType = useDeletePaidOtherGroup();
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
    indexColumn(filters.page, filters.limit),
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
    <div className="paid-other-group-table">
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={data?.data || []}
        rowKey="id"
        pagination={{
          current: filters.page,
          pageSize: filters.limit,
          total: data?.total || 0,
          onChange: (page, pageSize) =>
            setFilters((prev: any) => ({ ...prev, page, limit: pageSize })),
        }}
      />
    </div>
  );
}
