import { Button, Card, Form, Select, Space } from "antd";
import {
  useCreateSimCard,
  useUpdateSimCard,
  type CreateSimCardInput,
  type SimCard,
} from "../../config/queries/simcard/simcard-querys";

import { FilterOutlined } from "@ant-design/icons";
import SimCardFilter from "./ui/simcard-filter-modal";
import SimCardFormModal from "./ui/simcard-from-modal";
import SimCardTable from "./ui/simcard-table";
import { useGetAllClients } from "../../config/queries/clients/clients-querys";
import { useState } from "react";
import { useUrlState } from "../../hooks/useUrlState";

const { Option } = Select;

export default function SimCards() {
  const {
    page,
    setPage,
    search,
    handleSearch,
    filters,
    handleFilterApply,
  } = useUrlState();

  const [form] = Form.useForm();
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editing, setEditing] = useState<SimCard | null>(null);

  const { data: clients } = useGetAllClients({ page: 1, limit: 1000 });

  const createSimCard = useCreateSimCard();
  const updateSimCard = useUpdateSimCard();

  const onSubmit = (values: CreateSimCardInput) => {
    if (editing) {
      updateSimCard.mutate({ id: editing.id, ...values });
    } else {
      createSimCard.mutate(values);
    }
    setFilterModalOpen(false);
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
          <Select
            placeholder="Mijozni tanlang"
            showSearch
            optionFilterProp="label"
            style={{ width: 200 }}
            onSearch={handleSearch}
          >
            {clients?.data.map((client: any) => (
              <Option key={client.id} value={client.id} label={client.name}>
                {client.name}
              </Option>
            ))}
          </Select>
          <Button
            icon={<FilterOutlined />}
            onClick={() => setFilterModalOpen(!filterModalOpen)}
          >
            Filter
          </Button>
        </Space>
        <div className="flex items-center gap-3">
          <Button
            type="primary"
            onClick={() => {
              form.resetFields();
              setEditing(null);
              setFormModalOpen(true);
            }}
          >
            + Sim karta qo‘shish
          </Button>
        </div>
      </Space>

      <SimCardFilter
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={handleFilterApply}
        initialValues={filters}
        clients={clients}
      />

      <SimCardTable
        page={page}
        setPage={setPage}
        setEditing={setEditing}
        setFormModalOpen={setFormModalOpen}
        form={form}
        clients={clients}
        filters={filters}
        search={search}
      />

      <SimCardFormModal
        open={formModalOpen}
        onClose={() => {
          setFormModalOpen(false);
          setEditing(null);
        }}
        clients={clients}
        onSubmit={onSubmit}
        initialValues={editing || undefined}
      />
    </Card>
  );
}
