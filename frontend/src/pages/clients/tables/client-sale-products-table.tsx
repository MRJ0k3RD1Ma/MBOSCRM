import { useState } from "react";
import { indexColumn } from "../../../components/tables/indexColumn";
import { Table } from "antd";
import { useGetAllSaleProduct } from "../../../config/queries/sale/sale-product-querys";

export default function ClientSaleProductsTable({
  clientId,
}: {
  clientId: number;
}) {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data: saleProductsClient } = useGetAllSaleProduct({
    clientId,
    isSubscribe: false,
    page: page,
    limit,
  });

  const saleProductsColumns = [
    indexColumn(page, limit),
    {
      title: "Shartnoma raqami",
      dataIndex: ["sale", "code"],
      render: (code: number) => (code ? code : "-"),
    },
    {
      title: "Mahsulot nomi",
      dataIndex: ["product", "name"],
    },
    {
      title: "Narxi",
      dataIndex: "price",
      render: (priceCount: number) =>
        priceCount ? priceCount.toLocaleString("uz-UZ") + " so'm" : "0",
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
      title: "Umumiy narxi ",
      dataIndex: "priceCount",
      render: (priceCount: number) =>
        priceCount ? priceCount.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "Kiritdi",
      dataIndex: ["register", "name"],
    },
  ];
  return (
    <Table
      columns={saleProductsColumns}
      dataSource={saleProductsClient?.data}
      rowKey="id"
      pagination={{
        current: page,
        pageSize: limit,
        total: saleProductsClient?.total,
        onChange: (p) => setPage(p),
      }}
    />
  );
}
