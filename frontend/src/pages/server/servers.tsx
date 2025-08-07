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

import { PlusOutlined, MoreOutlined, FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  useCreateServer,
  useDeleteServer,
  useGetAllServers,
  useUpdateServer,
  type CreateServerInput,
  type Server,
} from "../../config/queries/server/servers-querys";
import dayjs from "dayjs";
import ServersFilterModal from "./ui/servers-filter-modal";
import ServerFormModal from "./ui/servers-form-modal";

export default function Servers() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Server | null>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading } = useGetAllServers({
    page,
    limit,
    ...(search ? { name: search } : {}),
    ...filters,
  });

  const createServer = useCreateServer();
  const updateServer = useUpdateServer();
  const deleteServer = useDeleteServer();

  const onSubmit = (values: CreateServerInput) => {
    if (editing) {
      updateServer.mutate({ id: editing.id, ...values });
    } else {
      createServer.mutate(values);
    }
    setOpen(false);
    setEditing(null);
  };

  const handleEdit = (server: Server) => {
    setEditing(server);
    form.setFieldsValue(server);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteServer.mutate(id);
  };

  const columns = [
    { title: "Nomi", dataIndex: "name" },
    { title: "Mas'ul", dataIndex: "responsible" },
    { title: "Tarif", dataIndex: "plan" },
    {
      title: "Tugash sanasi",
      dataIndex: "endDate",
      render: (text: string) =>
        text
          ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD HH:mm:ss")
          : "—",
    },
    { title: "Holat", dataIndex: "state" },
    // {
    //   title: "Amallar",
    //   key: "actions",
    //   render: (_: any, row: Server) => {
    //     const items: MenuProps["items"] = [
    //       {
    //         key: "edit",
    //         label: "Tahrirlash",
    //         onClick: () => handleEdit(row),
    //       },
    //       {
    //         key: "delete",
    //         label: "O‘chirish",
    //         danger: true,
    //         onClick: () => handleDelete(row.id),
    //       },
    //       {
    //         key: "view",
    //         label: "Batafsil ko‘rish",
    //         onClick: () => navigate(`/server/${row.id}`),
    //       },
    //     ];
    //     return (
    //       <div onClick={(e) => e.stopPropagation()}>
    //         <Dropdown menu={{ items }} trigger={["click"]}>
    //           <Tooltip title="Boshqarish">
    //             <Button icon={<MoreOutlined />} />
    //           </Tooltip>
    //         </Dropdown>
    //       </div>
    //     );
    //   },
    // },
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
          Yangi server qo‘shish
        </Button>
      </Space>

      <ServersFilterModal
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
            navigate(`/server/${record.id}`);
          },
        })}
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total,
          onChange: (page) => setPage(page),
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
