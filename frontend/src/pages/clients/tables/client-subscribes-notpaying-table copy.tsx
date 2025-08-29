import { useState } from "react";
import { useGetAllSubscribes } from "../../../config/queries/subscribe/subscribe-querys";
import dayjs from "dayjs";
import { indexColumn } from "../../../components/tables/indexColumn";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";

export default function ClientSubscribesNotpayingTable({
  clientId,
}: {
  clientId: number;
}) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data: subscribeClient } = useGetAllSubscribes({
    clientId,
    state: "NOTPAYING",
    page: page,
    limit,
  });

  const subscribeColumns = [
    indexColumn(page, limit),
    {
      title: "Shartnoma raqami",
      dataIndex: "sale",
      render: (sale: any) => (
        <a
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/sale/${sale.id}`);
          }}
          style={{ color: "#1677ff", cursor: "pointer" }}
        >
          {"#" + sale?.code || "Noma'lum"}
        </a>
      ),
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
      columns={subscribeColumns}
      dataSource={subscribeClient?.data}
      rowKey="id"
      pagination={{
        current: page,
        pageSize: limit,
        total: subscribeClient?.total,
        onChange: (p) => setPage(p),
      }}
      onRow={(record) => ({
        onClick: (e) => {
          if (
            (e.target as HTMLElement).closest("button") ||
            (e.target as HTMLElement).closest("svg")
          ) {
            return;
          }
          navigate(`/subscribe/${record.id}`);
        },
      })}
    />
  );
}
