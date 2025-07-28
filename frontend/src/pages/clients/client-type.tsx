import {
  Button,
  Card,
  Dropdown,
  Input,
  Space,
  Table,
  message,
  type MenuProps,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  useDeleteClientType,
  useGetAllClientTypes,
} from "../../config/queries/clients/client-type-querys";
import ClientTypeFormModal from "./ui/client-type-form-modal";

export default function ClientType() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ name: "", page: 1, limit: 10 });

  const { data, isLoading, refetch } = useGetAllClientTypes(filters);
  const deleteClientType = useDeleteClientType();

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<{ id: number; name: string } | null>(
    null
  );

  const handleDelete = async (record: any) => {
    try {
      await deleteClientType.mutateAsync(record.id);
      message.success("Muvaffaqiyatli o‘chirildi");
    } catch {
      message.error("O‘chirishda xatolik");
    }
  };

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, name: search, page: 1 }));
  };

  useEffect(() => {
    refetch();
  }, [filters]);

  const columns = [
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
    <Card>
      <Space
        style={{
          width: "100%",
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Space.Compact style={{ maxWidth: 400 }}>
          <Input
            placeholder="Tur nomi bo‘yicha qidirish"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onPressEnter={handleSearch}
            allowClear
          />
          <Button
            type="default"
            icon={<SearchOutlined />}
            onClick={handleSearch}
          />
        </Space.Compact>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setSelected(null);
            setModalOpen(true);
          }}
        >
          Yangi qo‘shish
        </Button>
      </Space>

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
            setFilters((prev) => ({ ...prev, page, limit: pageSize })),
        }}
      />

      <ClientTypeFormModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelected(null);
        }}
        selected={selected}
      />
    </Card>
  );
}
