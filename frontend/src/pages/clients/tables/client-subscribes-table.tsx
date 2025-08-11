import { useState } from "react";
import { useGetAllSubscribes } from "../../../config/queries/subscribe/subscribe-querys";
import dayjs from "dayjs";
import { indexColumn } from "../../../components/tables/indexColumn";
import { Table } from "antd";

export default function ClientSubscribesTable({
  clientId,
}: {
  clientId: number;
}) {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data: allSubscribeClient } = useGetAllSubscribes({
    clientId,
    page: page,
    limit,
  });

  const allSubscribeColumns = [
    indexColumn(page, limit),
    {
      title: "Shartnoma raqami",
      dataIndex: ["sale", "code"],
      key: "checkNumber",
    },
    {
      title: "To’lov qilishi kerak bo’lgan sanasi",
      dataIndex: "paying_date",
      render: (text: string) =>
        text ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD") : "—",
    },
    {
      title: "Narxi",
      dataIndex: "price",
      key: "price",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "To’lagan summasi",
      dataIndex: "paid",
      key: "paidAmount",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "To’lov turi",
      dataIndex: ["sale", "PaidClient", "0", "Payment", "name"],
      key: "paymentType",
      render: (name: string) => (name ? name : "Balans"),
    },
    {
      title: "Yaratilgan vaqt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) =>
        text ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD") : "—",
    },
  ];

  return (
    <Table
      columns={allSubscribeColumns}
      dataSource={allSubscribeClient?.data}
      rowKey="id"
      pagination={{
        current: page,
        pageSize: limit,
        total: allSubscribeClient?.total,
        onChange: (p) => setPage(p),
      }}
    />
  );
}
