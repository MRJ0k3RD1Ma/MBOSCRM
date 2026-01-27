import { useState } from "react";
import { Button, Card, Input, Space, Table } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useGetAllProducts,
  type Product,
} from "../../config/queries/products/products-querys";
import { useGetAllProductUnits } from "../../config/queries/products/product-unit-querys";
import { useGetAllProductGroups } from "../../config/queries/products/product-gorup-querys";
import ProductsFilterModal from "../products/ui/products-filter-modal";
import { indexColumn } from "../../components/tables/indexColumn";
import { useUrlState } from "../../hooks/useUrlState";

export default function PriceCurant() {
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

  const { data, isLoading } = useGetAllProducts({
    page,
    limit,
    ...(search ? { name: search } : {}),
    ...filters,
  });

  const { data: unitsData } = useGetAllProductUnits();
  const { data: groupData } = useGetAllProductGroups();

  const columns = [
    indexColumn(page, limit),
    { title: "Nomi", dataIndex: "name", key: "name" },
    { title: "Shtrix kodi", dataIndex: "barcode", key: "barcode" },
    {
      title: "Guruhi",
      dataIndex: "groupId",
      key: "groupId",
      render: (groupId: number) =>
        groupData?.data.find((g) => g.id === groupId)?.name || "–",
    },
    {
      title: "Qoldiq",
      key: "reminder",
      render: (_: any, row: Product) => {
        const unitName =
          unitsData?.data.find((u) => u.id === row.unitId)?.name || "";
        return `${row.countReminder} , ${unitName}`;
      },
    },
    {
      title: "Sotuv narxi",
      dataIndex: "price",
      key: "price",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    { title: "Turi", dataIndex: "type", key: "type" },
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
            placeholder="Mahsulot nomi bo‘yicha qidirish"
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
      <ProductsFilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={handleFilterApply}
        initialValues={filters}
        reminder={true}
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
            navigate(`/product/${record.id}`, {
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
