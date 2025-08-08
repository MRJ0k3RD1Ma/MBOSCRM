import { useState } from "react";
import { Button, Card, Input, Space, Table } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import { useGetAllSale } from "../../config/queries/sale/sale-querys";
import SalesFilterModal from "./ui/sales-filter-modal";

export default function SaleCredit() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const { data, isLoading } = useGetAllSale({
    page,
    limit: 10,
    ...(search ? { code: search } : {}),
    ...filters,
    credit: true,
  });

  const columns = [
    {
      title: "Sana",
      dataIndex: "date",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    { title: "Kod", dataIndex: "code" },
    { title: "Mijoz", dataIndex: "clientId" },
    { title: "Narx", dataIndex: "price" },
    { title: "Qarz", dataIndex: "credit" },
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
          <Button
            icon={<FilterOutlined />}
            onClick={() => setFilterModalOpen(!filterModalOpen)}
          >
            Filter
          </Button>
        </Space>
      </Space>

      <SalesFilterModal
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
            navigate(`/sale/${record.id}`);
          },
        })}
      />
    </Card>
  );
}
