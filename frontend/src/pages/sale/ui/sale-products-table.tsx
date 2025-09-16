import { Card, Table } from "antd";

import { indexColumn } from "../../../components/tables/indexColumn";
import { useGetAllProducts } from "../../../config/queries/products/products-querys";
import { useGetAllSaleProduct } from "../../../config/queries/sale/sale-product-querys";
import { useState } from "react";

export default function SaleProductsTable({
  currentId,
}: {
  currentId: number | null;
}) {
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data: saleProducts } = useGetAllSaleProduct({
    page,
    limit,
    saleId: currentId ?? undefined,
  });
  const { data: products } = useGetAllProducts();
  const productColumns = [
    indexColumn(page, limit),
    {
      title: "Mahsulot nomi",
      dataIndex: "productId",
      render: (id: number) =>
        products?.data?.find((p) => p.id === id)?.name || `ID: ${id}`,
    },
    {
      title: "Soni",
      dataIndex: "count",
      render: (_: any, record: any) => {
        const count = record.count || 0;
        const unitName = record.product?.ProductUnit?.name || "-";
        return `${count} ${unitName}`;
      },
    },
    {
      title: "Narxi",
      dataIndex: "price",
      render: (_: number, record: any) => {
        return record.price
          ? record.price.toLocaleString("uz-UZ") + " so'm"
          : "0";
      },
    },
    {
      title: "Jami narx",
      dataIndex: "priceCount",
      render: (record: any) => {
        return record ? record.toLocaleString("uz-UZ") + " so'm" : "0";
      },
    },
  ];

  return (
    <Card
      title="Sotilgan mahsulotlar"
      bordered={false}
      className="w-full"
      style={{ paddingBottom: 0 }}
    >
      <Table
        dataSource={saleProducts?.data || []}
        columns={productColumns}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: limit,
          total: saleProducts?.total || saleProducts?.data?.length || 0,
          onChange: setPage,
        }}
      />
    </Card>
  );
}
