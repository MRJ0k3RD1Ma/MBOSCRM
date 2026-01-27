import { useState } from "react";
import { Button, Card, Form, Input, Space, Table, Tag } from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useCreateServer,
  useGetAllServers,
  useUpdateServer,
  type CreateServerInput,
  type Server,
} from "../../config/queries/server/servers-querys";
import dayjs from "dayjs";
import ServersFilterModal from "./ui/servers-filter-modal";
import ServerFormModal from "./ui/servers-form-modal";
import { indexColumn } from "../../components/tables/indexColumn";
import { useUrlState } from "../../hooks/useUrlState";

export default function Servers() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Server | null>(null);

  const {
    page,
    search,
    localSearch,
    setLocalSearch,
    filters,
    setPage,
    handleSearch,
    handleFilterApply,
  } = useUrlState();

  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [limit] = useState(10);

  const { data, isLoading } = useGetAllServers({
    page,
    limit,
    ...(search ? { name: search } : {}),
    ...filters,
  });

  const createServer = useCreateServer();
  const updateServer = useUpdateServer();

  const onSubmit = (values: CreateServerInput) => {
    if (editing) {
      updateServer.mutate({ id: editing.id, ...values });
    } else {
      createServer.mutate(values);
    }
    setOpen(false);
    setEditing(null);
  };

  const columns = [
    indexColumn(page, limit),
    { title: "Nomi", dataIndex: "name" },
    { title: "Mas'ul", dataIndex: "responsible" },
    { title: "Tarif", dataIndex: "plan" },
    {
      title: "Tugash sanasi",
      dataIndex: "endDate",
      render: (text: string) =>
        text ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD") : "—",
    },
    { title: "Tugashi", dataIndex: "state" },
    {
      title: "Holat",
      dataIndex: "daysLeft",
      render: (daysLeft: number) => {
        let color = "green";
        if (daysLeft < 3) {
          color = "red";
        } else if (daysLeft < 7) {
          color = "orange";
        }

        const label =
          daysLeft === 0 ? "Muddati tugagan" : `${daysLeft} kun qoldi`;

        return <Tag color={color}>{label}</Tag>;
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
            placeholder="Server nomi bo‘yicha qidirish"
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
          Yangi server qo‘shish
        </Button>
      </Space>

      <ServersFilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={handleFilterApply}
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
            navigate(`/server/${record.id}`, {
              state: { search: location.search },
            });
          },
        })}
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total,
          onChange: setPage,
        }}
      />

      <ServerFormModal
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
