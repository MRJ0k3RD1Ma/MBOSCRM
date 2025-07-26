import { useEffect, useState } from "react";
import { Button, Card, Input, Modal, Space, Table, Form } from "antd";
import {
  useCreateClient,
  useDeleteClient,
  useGetAllClients,
  useUpdateClient,
  type Client,
  type CreateClientInput,
} from "../../config/queries/clients/clients-querys";

export default function ClientsPage() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading } = useGetAllClients({
    page,
    limit,
    ...(search ? { name: search } : {}),
  });

  const createClient = useCreateClient();
  const updateClient = useUpdateClient();
  const deleteClient = useDeleteClient();

  const onFinish = (values: CreateClientInput) => {
    if (editing) {
      updateClient.mutate({ id: editing.id, ...values });
    } else {
      createClient.mutate(values);
    }
    setOpen(false);
    form.resetFields();
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
          onClick={() => {
            setEditing(null);
            form.resetFields();
            setOpen(true);
          }}
        >
          Add Client
        </Button>
      }
    >
      <Space direction="vertical" style={{ width: "100%", marginBottom: 16 }}>
        <Input.Search
          placeholder="Search by name"
          allowClear
          enterButton
          onSearch={(val) => setSearch(val)}
          style={{ maxWidth: 300 }}
        />
      </Space>

      <Table
        columns={columns}
        dataSource={data?.data || []}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total,
          onChange: (page) => setPage(page),
        }}
      />

      <Modal
        open={open}
        title={editing ? "Edit Client" : "Add Client"}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
          setEditing(null);
        }}
        onOk={() => form.submit()}
        okText={editing ? "Update" : "Create"}
        destroyOnClose
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input placeholder="Enter client name" />
          </Form.Item>
          <Form.Item name="inn" label="INN" rules={[{ required: true }]}>
            <Input placeholder="Enter INN" />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input placeholder="Enter phone number" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter address" />
          </Form.Item>
          <Form.Item name="typeId" label="Type ID" rules={[{ required: true }]}>
            <Input type="number" placeholder="Enter type ID" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input placeholder="Enter description (optional)" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
