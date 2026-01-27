import { useState } from "react";
import { Button, Card, Form, Input, Space } from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import {
  useCreatePaidClient,
  useUpdatePaidClient,
  type PaidClient,
  type PaidClientDto,
} from "../../config/queries/clients/paid-client-querys";
import PaidClientFilterModal from "./ui/paid-clients-filter-modal";
import PaidClientFormModal from "./ui/paid-clients-form-modal";
import ClientsPaidTable from "./tables/clients-paid-table";
import { useUrlState } from "../../hooks/useUrlState";

export default function ClientsPaid() {
  const {
    page,
    setPage,
    search,
    handleSearch,
    localSearch,
    setLocalSearch,
    filters,
    handleFilterApply,
  } = useUrlState();

  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PaidClient | null>(null);
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const createPaidClient = useCreatePaidClient();
  const updatePaidClient = useUpdatePaidClient();

  const onSubmit = (values: PaidClientDto) => {
    if (editing) {
      updatePaidClient.mutate({ id: editing.id, ...values });
    } else {
      createPaidClient.mutate(values);
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
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onSearch={handleSearch}
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
          Yangi to‘lov qo‘shish
        </Button>
      </Space>

      <PaidClientFilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={handleFilterApply}
        initialValues={filters}
      />

      <ClientsPaidTable
        page={page}
        search={search}
        filters={filters}
        setEditing={setEditing}
        form={form}
        setOpen={setOpen}
        setPage={setPage}
      />
      <PaidClientFormModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSubmit={onSubmit}
        initialValues={editing || undefined}
        clientId={null}
        saleId={null}
      />
    </Card>
  );
}
