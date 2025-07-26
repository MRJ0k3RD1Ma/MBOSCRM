import {
  Button,
  Card,
  Input,
  Popconfirm,
  Space,
  Table,
  Typography,
  message,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
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
    if (!record.isDeleted) {
      message.warning("Bu turni o‘chirib bo‘lmaydi");
      return;
    }
    try {
      await deleteClientType.mutateAsync(record.id);
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
      render: (_: any, record: any) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelected({ id: record.id, name: record.name });
              setModalOpen(true);
            }}
          />
          <Popconfirm
            title="O‘chirishni istaysizmi?"
            onConfirm={() => handleDelete(record)}
            okText="Ha"
            cancelText="Yo‘q"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              disabled={!record.isDeleted}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={<Typography.Title level={4}>Mijozlar turlari</Typography.Title>}
      extra={
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
      }
    >
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tur nomi bo‘yicha qidirish"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onPressEnter={handleSearch}
        />
        <Button icon={<SearchOutlined />} onClick={handleSearch}>
          Qidirish
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
          onChange: (page, pageSize) => {
            setFilters((prev) => ({ ...prev, page, limit: pageSize }));
          },
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
