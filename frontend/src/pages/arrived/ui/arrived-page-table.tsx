import { Card, Table } from "antd";

import { indexColumn } from "../../../components/tables/indexColumn";
import { useGetAllArrivedProduct } from "../../../config/queries/arrived/arrived-product-querys";
import { useGetAllProducts } from "../../../config/queries/products/products-querys";
import { useState } from "react";

export default function ArrivedPageTable({
  currentId,
}: {
  currentId: number | null;
}) {
  const [page, setPage] = useState(1);

  const { data: productsList } = useGetAllProducts();
  const { data: arrivedProducts } = useGetAllArrivedProduct({
    page,
    limit: 5,
    arrivedId: currentId ?? undefined,
  });
  const productColumns = [
    indexColumn(page, 5),
    {
      title: "Mahsulot nomi",
      dataIndex: "productId",
      render: (id: number) =>
        productsList?.data?.find((p) => p.id === id)?.name || `ID: ${id}`,
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
      render: (priceCount: number) =>
        priceCount ? priceCount.toLocaleString("uz-UZ") + " so'm" : "0",
    },
  ];

  return (
    <Card
      title="Mahsulotlar ro'yxati"
      bordered={false}
      className="w-full"
      style={{ paddingBottom: 0 }}
    >
      <Table
        dataSource={
          arrivedProducts?.data?.filter((p) => p.arrivedId === currentId) || []
        }
        columns={productColumns}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: 5,
          total: arrivedProducts?.total,
          onChange: setPage,
        }}
      />
    </Card>
  );
}
