import { useState } from "react";
import dayjs from "dayjs";
import { indexColumn } from "../../../components/tables/indexColumn";
import { Table } from "antd";
import { useGetAllSale } from "../../../config/queries/sale/sale-querys";

export default function ClientSalesTable({ clientId }: { clientId: number }) {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data: salesClient } = useGetAllSale({
    clientId,
    page: page,
    limit,
  });

  const contractColumns = [
    indexColumn(page, limit),
    {
      title: "Shartnoma raqami",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "To’ladi",
      dataIndex: "dept",
      render: (_: number, record: any) => {
        const priceToUse = record.SaleProduct[0].is_subscribe
          ? record.SaleProduct[0].product?.dept
          : record.dept;

        return priceToUse ? priceToUse.toLocaleString("uz-UZ") + " so'm" : "0";
      },
    },
    {
      title: "Narxi",
      dataIndex: "price",
      render: (_: number, record: any) => {
        const priceToUse = record.SaleProduct[0].is_subscribe
          ? record.SaleProduct[0].product?.price
          : record.price;

        return priceToUse ? priceToUse.toLocaleString("uz-UZ") + " so'm" : "0";
      },
    },
    {
      title: "Qarzdorlik",
      dataIndex: "credit",
      render: (dept: number) =>
        dept ? dept.toLocaleString("uz-UZ") + " so'm" : "-",
    },
    {
      title: "Obunami",
      dataIndex: ["SaleProduct", "0", "is_subscribe"],
      render: (is_subscribe: boolean) => (is_subscribe ? "Ha" : "Yo'q"),
    },
    {
      title: "Yaratilgan vaqt",
      dataIndex: "createdAt",
      render: (text: string) =>
        text ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD") : "—",
    },
  ];

  return (
    <Table
      columns={contractColumns}
      dataSource={salesClient?.data}
      rowKey="id"
      pagination={{
        current: page,
        pageSize: limit,
        total: salesClient?.total,
        onChange: (p) => setPage(p),
      }}
    />
  );
}
