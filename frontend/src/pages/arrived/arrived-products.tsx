import { useState } from "react";
import { Button, Card, Input, Space, Table } from "antd";
import { FilterOutlined } from "@ant-design/icons";

import dayjs from "dayjs";
import { useGetAllArrivedProduct } from "../../config/queries/arrived/arrived-product-querys";
import ArrivedProductsFilterModal from "./ui/arrived-products-filter-modal";
import { useGetAllArrived } from "../../config/queries/arrived/arrived-qureys";
import { useGetAllProducts } from "../../config/queries/products/products-querys";
import { indexColumn } from "../../components/tables/indexColumn";

export default function ArrivedProducts() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const { data: arriveds } = useGetAllArrived({ page: 1, limit: 100 });
  const { data: products } = useGetAllProducts({ page: 1, limit: 100 });
  const { data, isLoading } = useGetAllArrivedProduct({
    page,
    limit: 10,
    ...(search ? { code: search } : {}),
    ...filters,
  });

  const columns = [
    indexColumn(page, 10),
    {
      title: "Yetkazib beruvchi",
      dataIndex: ["Arrived", "supplier", ["name"]],
    },
    {
      title: "Sana",
      dataIndex: "createdAt",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Kirim",
      dataIndex: "arrivedId",
      render: (id: number) => {
        const item = arriveds?.data?.find((a: any) => a.id === id);
        return item ? `${item.code}` : id;
      },
    },
    {
      title: "Mahsulot",
      dataIndex: "productId",
      render: (id: number) => {
        const product = products?.data?.find((p: any) => p.id === id);
        return product ? product.name : id;
      },
    },
    { title: "Soni", dataIndex: "count" },
    {
      title: "Narxi",
      dataIndex: "price",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "Jami narx",
      dataIndex: "priceCount",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
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
          <Button
            icon={<FilterOutlined />}
            onClick={() => setFilterModalOpen(!filterModalOpen)}
          >
            Filter
          </Button>
        </Space>
      </Space>
      <ArrivedProductsFilterModal
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
      />
    </Card>
  );
}
