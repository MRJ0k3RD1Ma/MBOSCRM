import { Card, Table } from "antd";

import dayjs from "dayjs";
import { indexColumn } from "../../../components/tables/indexColumn";
import timezone from "dayjs/plugin/timezone";
import { useGetAllClients } from "../../../config/queries/clients/clients-querys";
import { useGetAllPaidClients } from "../../../config/queries/clients/paid-client-querys";
import { useGetAllPayments } from "../../../config/queries/payment/payment-querys";
import { useGetAllSale } from "../../../config/queries/sale/sale-querys";
import { useState } from "react";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

const formatDate = (date: string) =>
  dayjs.utc(date).tz("Asia/Tashkent").format("YYYY-MM-DD HH:mm");

export default function ClientsPaidTable() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data: clients } = useGetAllClients({ page: 1, limit: 1000 });
  const { data: sales } = useGetAllSale({ page: 1, limit: 1000 });
  const { data: payments } = useGetAllPayments({ page: 1, limit: 1000 });

  const { data, isLoading } = useGetAllPaidClients({
    page,
    limit,
  });

  const columns = [
    indexColumn(page, limit),
    {
      title: "Mijoz",
      dataIndex: "clientId",
      render: (clientId: number) =>
        clients?.data.find((u) => u.id === clientId)?.name || "–",
    },

    {
      title: "Sotuv",
      dataIndex: "saleId",
      render: (saleId: number) =>
        sales?.data.find((u) => u.id === saleId)?.code || "–",
    },
    {
      title: "To'lov turi",
      dataIndex: "paymentId",
      render: (paymentId: number) =>
        payments?.data.find((u) => u.id === paymentId)?.name || "–",
    },
    {
      title: "To‘lov sanasi",
      dataIndex: "paidDate",
      render: (date: string) => formatDate(date),
    },
    {
      title: "Narxi",
      dataIndex: "price",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
  ];

  return (
    <Card
      className="ClientsPaidTable"
      title={` Oylik mijoz daromadlari ${data?.price ? data?.price.toLocaleString("uz-UZ") + " so'm" : "0"}`}
    >
      <Table
        columns={columns}
        dataSource={data?.data || []}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total || 0,
          onChange: (page) => setPage(page),
        }}
      />
    </Card>
  );
}
