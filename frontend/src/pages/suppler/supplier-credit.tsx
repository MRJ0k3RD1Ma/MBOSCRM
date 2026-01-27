import { useState } from "react";
import { Button, Card, Input, Space, Table } from "antd";

import { FilterOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetAllSuppliers } from "../../config/queries/supplier/supplier-querys";
import SuppliersFilterModal from "./ui/suppliers-filter-modal";
import { indexColumn } from "../../components/tables/indexColumn";
import { useUrlState } from "../../hooks/useUrlState";

export default function SupplierCredit() {
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
  const [limit] = useState(10);

  const { data, isLoading } = useGetAllSuppliers({
    page,
    limit,
    ...(search ? { name: search } : {}),
    ...filters,
    isPositiveBalance: false,
  });

  const columns = [
    indexColumn(page, limit),
    { title: "Nomi", dataIndex: "name" },
    { title: "Telefon", dataIndex: "phone" },
    { title: "Qo‘shimcha telefon", dataIndex: "phoneTwo" },
    { title: "Izoh", dataIndex: "description" },
    {
      title: "Balans",
      dataIndex: "balance",
      render: (dept: number) =>
        dept ? dept.toLocaleString("uz-UZ") + " so'm" : "0",
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
            placeholder="Yetkazib beruvchi nomi bo‘yicha qidirish"
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
      <SuppliersFilterModal
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
            navigate(`/supplier/${record.id}`, {
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
    </Card>
  );
}
