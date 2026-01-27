import { useState } from "react";
import { Button, Card, Select, Space, Table, Tag } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useGetAllSubscribes,
  type Subscribe,
} from "../../config/queries/subscribe/subscribe-querys";
import SubscribesFilterModal from "./ui/subscribe-filter-modal";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { indexColumn } from "../../components/tables/indexColumn";
import { useGetAllClients } from "../../config/queries/clients/clients-querys";
import { useUrlState } from "../../hooks/useUrlState";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function Subscribes() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    page,
    filters,
    setPage,
    handleFilterApply,
  } = useUrlState();

  const [limit] = useState(10);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const { data: clients } = useGetAllClients({ page: 1, limit: 100 });

  const { data, isLoading } = useGetAllSubscribes({
    page,
    limit,
    ...filters,
  });

  const columns = [
    indexColumn(page, limit),
    {
      title: "To‘lov sanasi",
      dataIndex: "paying_date",
      render: (date: string) =>
        dayjs.utc(date).tz("Asia/Tashkent").format("YYYY-MM-DD"),
    },
    {
      title: "Shartnoma raqami",
      dataIndex: "sale",
      render: (sale: any) => (
        <a
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/sale/${sale.id}`, { state: { search: location.search } });
          }}
          style={{ color: "#1677ff", cursor: "pointer" }}
        >
          {"#" + sale?.code || "Noma'lum"}
        </a>
      ),
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
    {
      title: "Narx",
      dataIndex: "price",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "To‘langan",
      dataIndex: "paid",
      render: (paid: number) =>
        paid ? paid.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "Holat",
      dataIndex: "state",
      render: (state: string) => {
        const color = state === "PAID" && "PAYING" ? "green" : "red";
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
          <Select
            placeholder="Mijozni tanlang"
            showSearch
            allowClear
            optionFilterProp="label"
            style={{ minWidth: 200 }}
            value={filters.clientId}
            onChange={(value) => {
              handleFilterApply({ ...filters, clientId: value });
            }}
          >
            {clients?.data?.map((client) => (
              <Select.Option
                key={client.id}
                value={client.id}
                label={client.name}
              >
                {client.name}
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
      </Space>

      <SubscribesFilterModal
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
        onRow={(record: Subscribe) => ({
          onClick: () => navigate(`/subscribe/${record.id}`, { state: { search: location.search } }),
        })}
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total,
          onChange: setPage,
        }}
      />
    </Card>
  );
}
