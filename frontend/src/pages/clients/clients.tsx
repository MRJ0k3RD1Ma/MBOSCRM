import { useState } from "react";
import {
  Button,
  Card,
  Dropdown,
  Form,
  Input,
  message,
  Space,
  Table,
  Tooltip,
  type MenuProps,
} from "antd";
import {
  useCreateClient,
  useDeleteClient,
  useGetAllClients,
  useUpdateClient,
  type Client,
  type CreateClientInput,
} from "../../config/queries/clients/clients-querys";
import { PlusOutlined, MoreOutlined, FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ClientsFilterModal from "./ui/clients-filter-modal";
import dayjs from "dayjs";
import { indexColumn } from "../../components/tables/indexColumn";
import ClientFormModal from "./ui/clients-form-modal";

export default function ClientsPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading } = useGetAllClients({
    page,
    limit,
    ...(search ? { name: search } : {}),
    ...filters,
  });

  const createClient = useCreateClient();
  const updateClient = useUpdateClient();
  const deleteClient = useDeleteClient();

  const onSubmit = (values: CreateClientInput) => {
    if (editing) {
      updateClient.mutate({ id: editing.id, ...values });
      message.success("Mijoz yangilandi");
    } else {
      createClient.mutate(values);
      message.success("Mijoz yaratildi");
    }
    setOpen(false);
    setEditing(null);
  };

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
        <Space>
          <Input.Search
            placeholder="Mijoz nomi bo‘yicha qidirish"
            allowClear
            enterButton
            onSearch={(val) => {
              setSearch(val);
              setPage(1);
            }}
            style={{ maxWidth: 300 }}
          />
          <Button
            icon={<FilterOutlined />}
            onClick={() => setFilterModalOpen(!filterModalOpen)}
          >
            Filter
          </Button>
        </Space>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditing(null);
            form.resetFields();
            setOpen(true);
          }}
        >
          Yangi mijoz qo‘shish
        </Button>
      </Space>
      <ClientsFilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={(values) => {
          setFilters(values);
          setPage(1);
        }}
        initialValues={filters}
      />
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

      <ClientFormModal
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
