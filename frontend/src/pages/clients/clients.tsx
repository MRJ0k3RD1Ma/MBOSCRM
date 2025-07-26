import { useState } from "react";
import { Button, Card, Input, Space, Table, Form } from "antd";
import {
  useCreateClient,
  useDeleteClient,
  useGetAllClients,
  useUpdateClient,
  type Client,
  type CreateClientInput,
} from "../../config/queries/clients/clients-querys";
import { PlusOutlined } from "@ant-design/icons";
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

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "INN", dataIndex: "inn" },
    { title: "Phone", dataIndex: "phone" },
    { title: "Address", dataIndex: "address" },
    { title: "Description", dataIndex: "description" },
    {
      title: "Actions",
      render: (_: any, row: Client) => (
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              setEditing(row);
              form.setFieldsValue(row);
              setOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            size="small"
            onClick={() => deleteClient.mutate(row.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Clients"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditing(null);
            form.resetFields();
            setOpen(true);
          }}
        >
          Yangi mijoz qo'shish
        </Button>
      }
    >
      <Space direction="vertical" style={{ width: "100%", marginBottom: 16 }}>
        <Input.Search
          placeholder="Search by name"
          allowClear
          enterButton
          onSearch={(val) => {
            setSearch(val);
            setPage(1);
          }}
          style={{ maxWidth: 300 }}
        />
      </Space>

      <Table
        columns={columns}
        dataSource={data?.data || []}
        loading={isLoading}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => navigate(`/client/${record.id}`),
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
