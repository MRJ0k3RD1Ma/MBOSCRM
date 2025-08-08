import { useState } from "react";
import {
  Button,
  Card,
  Dropdown,
  Form,
  Space,
  Table,
  Tooltip,
  type MenuProps,
} from "antd";
import { PlusOutlined, MoreOutlined, FilterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import {
  useGetAllPaidOthers,
  useCreatePaidOther,
  useUpdatePaidOther,
  useDeletePaidOther,
  type PaidOther,
  type PaidOtherDto,
} from "../../config/queries/paid/paid-other";
import PaidOtherFilterModal from "./ui/paid-other-filter-modal";
import PaidOtherFormModal from "./ui/paid-other-form-modal";

export default function PaidOtherPage() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PaidOther | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading } = useGetAllPaidOthers({
    page,
    limit,
    ...filters,
  });

  const createPaidOther = useCreatePaidOther();
  const updatePaidOther = useUpdatePaidOther();
  const deletePaidOther = useDeletePaidOther();

  const onSubmit = (values: PaidOtherDto) => {
    if (editing) {
      updatePaidOther.mutate({ id: String(editing.id), ...values });
    } else {
      createPaidOther.mutate(values);
    }
    setOpen(false);
    setEditing(null);
  };

  const handleEdit = (row: PaidOther) => {
    setEditing(row);
    form.setFieldsValue({
      ...row,
      paidDate: row.paidDate ? dayjs(row.paidDate) : undefined,
    });
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    deletePaidOther.mutate(String(id));
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    {
      title: "Guruh",
      dataIndex: "groupId",
      render: (_: any, row: PaidOther) => row.group?.name || "–",
    },
    {
      title: "Turi",
      dataIndex: "type",
      render: (type: PaidOther["type"]) =>
        type === "INCOME" ? "Kirim" : "Chiqim",
    },
    { title: "To‘lov miqdori", dataIndex: "price" },
    {
      title: "To‘langan sana",
      dataIndex: "paidDate",
      render: (text: string) => (text ? dayjs(text).format("YYYY-MM-DD") : "–"),
    },
    { title: "Izoh", dataIndex: "description" },
    {
      title: "Amallar",
      key: "actions",
      render: (_: any, row: PaidOther) => {
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
        style={{
          width: "100%",
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          icon={<FilterOutlined />}
          onClick={() => setFilterModalOpen(!filterModalOpen)}
        >
          Filter
        </Button>

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
        onApply={(values) => {
          setFilters(values);
          setPage(1);
        }}
        initialValues={filters}
      />

      <Table
        columns={columns}
        dataSource={data || []}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: limit,
          onChange: (page) => setPage(page),
        }}
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
