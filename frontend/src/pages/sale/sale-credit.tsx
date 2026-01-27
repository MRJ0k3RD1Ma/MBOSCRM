import { useState } from "react";
import { Button, Card, Input, Space, Table } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

import dayjs from "dayjs";
import { useGetAllSale } from "../../config/queries/sale/sale-querys";
import SalesFilterModal from "./ui/sales-filter-modal";
import { indexColumn } from "../../components/tables/indexColumn";
import { useGetAllClients } from "../../config/queries/clients/clients-querys";
import { useUrlState } from "../../hooks/useUrlState";

export default function SaleCredit() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    page,
    setPage,
    search,
    handleSearch,
    localSearch,
    setLocalSearch,
    filters,
    handleFilterApply,
  } = useUrlState();

  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const { data: clients } = useGetAllClients({ page: 1, limit: 1000 });

  const { data, isLoading } = useGetAllSale({
    page,
    limit: 10,
    ...(search ? { code: search } : {}),
    ...filters,
    credit: true,
  });

  const columns = [
    indexColumn(page, 10),
    {
      title: "Sana",
      dataIndex: "date",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    { title: "Kod", dataIndex: "code" },
    {
      title: "Mijoz",
      dataIndex: "clientId",
      render: (clientId: number) => {
        const client = clients?.data?.find((c) => c.id === clientId);
        return client?.name || "—";
      },
    },
    {
      title: "Narx",
      dataIndex: "price",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "Qarz",
      dataIndex: "credit",
      render: (credit: number) =>
        credit ? credit.toLocaleString("uz-UZ") + " so'm" : "0",
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
      </Space>

      <SalesFilterModal
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
            navigate(`/sale/${record.id}`, {
              state: { search: location.search },
            });
          },
        })}
      />
    </Card>
  );
}
