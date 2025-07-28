import { useState } from "react";
import {
  Button,
  Card,
  Dropdown,
  Form,
  Input,
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
import { PlusOutlined, MoreOutlined } from "@ant-design/icons";
import ClientModal from "./ui/clients-form-modal";
import { useGetAllClientTypes } from "../../config/queries/clients/client-type-querys";
import { useNavigate } from "react-router-dom";

export default function ClientsPage() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const navigate = useNavigate();

  const { data, isLoading } = useGetAllClients({
    page,
    limit,
    ...(search ? { name: search } : {}),
  });
  const { data: types } = useGetAllClientTypes();
  const createClient = useCreateClient();
  const updateClient = useUpdateClient();
  const deleteClient = useDeleteClient();

  const onSubmit = (values: CreateClientInput) => {
    if (editing) {
      updateClient.mutate({ id: editing.id, ...values });
    } else {
      createClient.mutate(values);
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
    { title: "Name", dataIndex: "name" },
    { title: "INN", dataIndex: "inn" },
    { title: "Phone", dataIndex: "phone" },
    { title: "Address", dataIndex: "address" },
    { title: "Description", dataIndex: "description" },
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

      <ClientModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSubmit={onSubmit}
        initialValues={editing || undefined}
        types={types?.data || []}
      />
    </Card>
  );
}
