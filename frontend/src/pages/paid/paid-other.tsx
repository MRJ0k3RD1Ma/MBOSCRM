import { useState } from "react";
import { Button, Card, Form, Select, Space } from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import {
  useCreatePaidOther,
  useUpdatePaidOther,
  type PaidOther,
  type PaidOtherDto,
} from "../../config/queries/paid/paid-other";
import PaidOtherFilterModal from "./ui/paid-other-filter-modal";
import PaidOtherFormModal from "./ui/paid-other-form-modal";
import { useGetAllPaidOtherGroups } from "../../config/queries/paid/paid-other-group";
import PaidOtherTable from "./ui/paid-other-table";
import { useUrlState } from "../../hooks/useUrlState";

export default function PaidOtherPage() {
  const {
    page,
    setPage,
    filters,
    handleFilterApply,
  } = useUrlState();

  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PaidOther | null>(null);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const { data: groupData } = useGetAllPaidOtherGroups();
  const createPaidOther = useCreatePaidOther();
  const updatePaidOther = useUpdatePaidOther();

  const onSubmit = (values: PaidOtherDto) => {
    if (editing) {
      updatePaidOther.mutate({ id: String(editing.id), ...values });
    } else {
      createPaidOther.mutate(values);
    }
    setOpen(false);
    setEditing(null);
  };

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
        <Space>
          <Select
            placeholder="Guruhni tanlang"
            showSearch
            allowClear
            optionFilterProp="label"
            style={{ minWidth: 200 }}
            value={filters.serverId}
            onChange={(value) => {
              handleFilterApply({ serverId: value });
            }}
          >
            {groupData?.data.map((p: { id: number; name: string }) => (
              <Select.Option key={p.id} value={p.id} label={p.name}>
                {p.name}
              </Select.Option>
            ))}
          </Select>
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
          Yangi to‘lov
        </Button>
      </Space>

      <PaidOtherFilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={handleFilterApply}
        initialValues={filters}
      />
      <PaidOtherTable
        page={page}
        filters={filters}
        setEditing={setEditing}
        form={form}
        setOpen={setOpen}
        setPage={setPage}
      />

      <PaidOtherFormModal
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
