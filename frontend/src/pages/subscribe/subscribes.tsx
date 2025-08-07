import { useState } from "react";
import { Button, Card, Input, Space, Table, Tag } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  useGetAllSubscribes,
  type Subscribe,
} from "../../config/queries/subscribe/subscribe-querys";
import SubscribesFilterModal from "./ui/subscribe-filter-modal";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function Subscribes() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const { data, isLoading } = useGetAllSubscribes({
    page,
    limit,
    ...(search ? { clientName: search } : {}),
    ...filters,
  });

  const columns = [
    {
      title: "To‘lov sanasi",
      dataIndex: "paying_date",
      render: (date: string) =>
        dayjs.utc(date).tz("Asia/Tashkent").format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Mijoz",
      dataIndex: "client",
      render: (client: any) => client?.name || "Noma'lum",
    },
    {
      title: "Sotuv",
      dataIndex: "sale",
      render: (sale: any) => sale?.id || "-",
    },
    { title: "Narx", dataIndex: "price" },
    { title: "To‘langan", dataIndex: "paid" },
    {
      title: "Holat",
      dataIndex: "state",
      render: (state: string) => {
        const color = state === "PAYING" ? "green" : "red";
        return <Tag color={color}>{state}</Tag>;
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
            placeholder="Mijoz bo‘yicha qidirish"
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
      </Space>

      <SubscribesFilterModal
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
        onRow={(record: Subscribe) => ({
          onClick: () => navigate(`/subscribe/${record.id}`),
        })}
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total,
          onChange: (page) => setPage(page),
        }}
      />
    </Card>
  );
}
