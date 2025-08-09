import { useState } from "react";
import dayjs from "dayjs";
import { indexColumn } from "../../../components/tables/indexColumn";
import { Table } from "antd";
import { useGetAllPaidClients } from "../../../config/queries/clients/paid-client-querys";

export default function ClientPaidsTable({ clientId }: { clientId: number }) {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data: paidClient } = useGetAllPaidClients({
    clientId,
    page: page,
    limit,
  });

  const paidByClientColumns = [
    indexColumn(page, limit),
    {
      title: "To’lov sanasi",
      dataIndex: "paidDate",
      render: (text: string) =>
        text
          ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD HH:mm:ss")
          : "—",
    },
    {
      title: "Narxi",
      dataIndex: "price",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    { title: "To’lov turi", dataIndex: ["Payment", "name"] },
    {
      title: "Kiritilgan vaqti",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) =>
        text
          ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD HH:mm:ss")
          : "—",
    },
    { title: "Qabul qiluvchi", dataIndex: ["register", "name"] },
  ];

  return (
    <Table
      columns={paidByClientColumns}
      dataSource={paidClient}
      rowKey="id"
      pagination={{
        current: page,
        pageSize: limit,
        total: paidClient?.length,
        onChange: (p) => setPage(p),
      }}
    />
  );
}
