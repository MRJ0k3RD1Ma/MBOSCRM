import { Table } from "antd";
import { indexColumn } from "../../../components/tables/indexColumn";
import { useGetAllSaleProduct } from "../../../config/queries/sale/sale-product-querys";
import { useState } from "react";

export default function ClientSimCardTable({ clientId }: { clientId: number }) {
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
    { title: "Kompaniya", dataIndex: "Kompaniya", key: "Kompaniya" },
    { title: "Raqami", dataIndex: "phone", key: "phone" },
    { title: "Tashkiloti", dataIndex: "Tashkiloti", key: "Tashkiloti" },
    { title: "Mijoz nomi", dataIndex: "Mijoz nomi", key: "Mijoz nomi" },
    { title: "Izoh", dataIndex: "Izoh", key: "Izoh" },
    { title: "Holati", dataIndex: "Holati", key: "Holati" },
    {
      title: "Aktiv qilingan sana",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => new Date(text).toLocaleString("uz-UZ"),
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
