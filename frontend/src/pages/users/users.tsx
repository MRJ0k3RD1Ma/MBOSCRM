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
  useCreateUser,
  useDeleteUser,
  useGetAllUsers,
  useUpdateUser,
  type User,
  type CreateUserInput,
} from "../../config/queries/users/users-querys";
import { PlusOutlined, MoreOutlined, FilterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import UserFormModal from "./ui/user-form-modal";
import UsersFilterModal from "./ui/user-filter-modal";

export default function Users() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading } = useGetAllUsers({
    page,
    limit,
    ...(search ? { name: search } : {}),
    ...filters,
  });

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const onSubmit = (values: CreateUserInput) => {
    if (editing) {
      updateUser.mutate({ id: editing.id, ...values });
    } else {
      createUser.mutate(values);
    }
    setOpen(false);
    setEditing(null);
  };

  const handleEdit = (user: User) => {
    setEditing(user);
    form.setFieldsValue(user);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteUser.mutate(id);
  };

  const columns = [
    { title: "Ism", dataIndex: "name" },
    { title: "Login", dataIndex: "username" },
    { title: "Telefon", dataIndex: "phone" },
    { title: "Rol ID", dataIndex: "roleId" },
    {
      title: "Yaratilgan vaqti",
      dataIndex: "createdAt",
      render: (text: string) =>
        text
          ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD HH:mm:ss")
          : "—",
    },
    {
      title: "Yangilangan vaqti",
      dataIndex: "updatedAt",
      render: (text: string) =>
        text
          ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD HH:mm:ss")
          : "—",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, row: User) => {
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
            placeholder="Foydalanuvchi ismi bo‘yicha qidirish"
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
          Yangi foydalanuvchi qo‘shish
        </Button>
      </Space>
      <UsersFilterModal
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
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total,
          onChange: (page) => setPage(page),
        }}
      />
      <UserFormModal
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
