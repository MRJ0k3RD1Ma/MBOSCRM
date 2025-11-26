import { Button, Dropdown, Table, Tooltip, type MenuProps } from "antd";
import { indexColumn } from "../../../components/tables/indexColumn";
import {
  useDeleteUser,
  useGetAllUsers,
  type User,
} from "../../../config/queries/users/users-querys";
import { useState } from "react";
import dayjs from "dayjs";
import { MoreOutlined } from "@ant-design/icons";

export default function UsersTable({
  form,
  search,
  filters,
  setEditing,
  setOpen,
  page,
  setPage,
}: {
  form: any;
  search: any;
  filters: any;
  setEditing: any;
  setOpen: any;
  page: number;
  setPage: any;
}) {
  const [limit] = useState(10);

  const { data, isLoading } = useGetAllUsers({
    page,
    limit,
    ...(search ? { name: search } : {}),
    ...filters,
  });

  const deleteUser = useDeleteUser();

  const handleEdit = (user: User) => {
    setEditing(user);
    form.setFieldsValue(user);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteUser.mutate(id);
  };

  const columns = [
    indexColumn(page, limit),
    { title: "Nomi", dataIndex: "name" },
    { title: "Username", dataIndex: "username" },
    {
      title: "Telefon",
      dataIndex: "phone",
      render: (text: string) => (text ? text : "-"),
    },
    {
      title: "Role",
      dataIndex: ["UserRole", "name"],
      render: (text: string) => (text ? text : "-"),
    },
    {
      title: "Yaratilgan vaqti",
      dataIndex: "createdAt",
      render: (text: string) =>
        text ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD") : "—",
    },
    {
      title: "Yangilangan vaqti",
      dataIndex: "updatedAt",
      render: (text: string) =>
        text ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD") : "—",
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
  );
}
