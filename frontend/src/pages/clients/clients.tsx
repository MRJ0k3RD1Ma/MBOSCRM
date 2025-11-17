import { useState } from "react";
import { Button, Card, Form, Input, Space } from "antd";
import {
  useCreateClient,
  useUpdateClient,
  type Client,
  type CreateClientInput,
} from "../../config/queries/clients/clients-querys";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import ClientsFilterModal from "./ui/clients-filter-modal";
import ClientFormModal from "./ui/clients-form-modal";
import ClientsPageTable from "./tables/clients-page-table";

export default function ClientsPage() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const createClient = useCreateClient();
  const updateClient = useUpdateClient();

  const onSubmit = (values: CreateClientInput) => {
    if (editing) {
      updateClient.mutate({ id: editing.id, ...values });
    } else {
      createClient.mutate(values);
    }
    setOpen(false);
    setEditing(null);
  };

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
      <ClientsPageTable
        page={page}
        search={search}
        filters={filters}
        setEditing={setEditing}
        form={form}
        setOpen={setOpen}
        setPage={setPage}
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
