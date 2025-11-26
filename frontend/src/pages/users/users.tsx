import { useState } from "react";
import { Button, Card, Form, Input, Space } from "antd";
import {
  useCreateUser,
  useUpdateUser,
  type User,
  type CreateUserInput,
} from "../../config/queries/users/users-querys";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import UserFormModal from "./ui/user-form-modal";
import UsersFilterModal from "./ui/user-filter-modal";
import UsersTable from "./ui/users-table";

export default function Users() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const onSubmit = (values: CreateUserInput) => {
    if (editing) {
      updateUser.mutate({ id: editing.id, ...values });
    } else {
      createUser.mutate(values);
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
      <UsersTable
        form={form}
        search={search}
        filters={filters}
        setEditing={setEditing}
        setOpen={setOpen}
        page={page}
        setPage={setPage}
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
