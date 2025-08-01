import { useState } from "react";
import {
  Button,
  Card,
  Dropdown,
  Input,
  Space,
  Table,
  Tooltip,
  message,
  type MenuProps,
} from "antd";
import { PlusOutlined, MoreOutlined, FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  useDeleteArrived,
  useGetAllArrived,
  type Arrived,
} from "../../config/queries/arrived/arrived-qureys";
import dayjs from "dayjs";

export default function Arriveds() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetAllArrived({
    page,
    limit: 10,
    ...(search ? { code: search } : {}),
  });

  const deleteArrived = useDeleteArrived();
  const handleDelete = (id: number) => {
    deleteArrived.mutate(id, {
      onSuccess: () => message.success("Kirim o‘chirildi"),
    });
  };

  const columns = [
    {
      title: "Sana",
      dataIndex: "date",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    { title: "Kod", dataIndex: "code" },
    { title: "Tovar hujjati", dataIndex: "waybillNumber" },
    { title: "Izoh", dataIndex: "description" },
    { title: "Narxi", dataIndex: "price" },
    {
      title: "Amallar",
      key: "actions",
      render: (_: any, row: Arrived) => {
        const items: MenuProps["items"] = [
          {
            key: "edit",
            label: "Tahrirlash",
            onClick: () => navigate(`/arrived/edit/${row.id}`),
          },
          {
            key: "delete",
            label: "O‘chirish",
            danger: true,
            onClick: () => handleDelete(row.id),
          },
          {
            key: "view",
            label: "Tafsilotlar",
            onClick: () => navigate(`/arrived/${row.id}`),
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
        }}
      >
        <Space>
          <Input.Search
            placeholder="Kod bo‘yicha qidirish"
            allowClear
            enterButton
            onSearch={(val) => {
              setSearch(val);
              setPage(1);
            }}
            style={{ maxWidth: 300 }}
          />
          <Button icon={<FilterOutlined />}>Filter</Button>
        </Space>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            navigate("/arrived/create");
          }}
        >
          Yangi kirim
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={data?.data || []}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: 10,
          total: data?.total,
          onChange: setPage,
        }}
        onRow={(record) => ({
          onClick: (e) => {
            if (
              (e.target as HTMLElement).closest("button") ||
              (e.target as HTMLElement).closest("svg")
            )
              return;
            navigate(`/arrived/${record.id}`);
          },
        })}
      />
    </Card>
  );
}







