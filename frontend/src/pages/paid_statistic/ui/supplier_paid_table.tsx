import { Card, Table } from "antd";

import dayjs from "dayjs";
import { indexColumn } from "../../../components/tables/indexColumn";
import timezone from "dayjs/plugin/timezone";
import { useGetAllPaidSuppliers } from "../../../config/queries/supplier/paid-supplier-querys";
import { useGetAllPayments } from "../../../config/queries/payment/payment-querys";
import { useGetAllSuppliers } from "../../../config/queries/supplier/supplier-querys";
import { useState } from "react";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function SupplierPaidTable() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data: suppliersData } = useGetAllSuppliers({ page: 1, limit: 1000 });
  const { data: paymentsData } = useGetAllPayments({ page: 1, limit: 1000 });

  const { data, isLoading } = useGetAllPaidSuppliers({
    page,
    limit,
  });

  const columns = [
    indexColumn(page, limit),
    {
      title: "Yetkazuvchi",
      dataIndex: "supplierId",
      render: (supplierId: number) =>
        suppliersData?.data.find((u) => u.id === supplierId)?.name || "–",
    },
    {
      title: "To‘lov miqdori",
      dataIndex: "price",
      render: (dept: number) =>
        dept ? dept.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "To‘langan sana",
      dataIndex: "paidDate",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "To‘lov turi",
      dataIndex: "paymentId",
      render: (paymentId: number) =>
        paymentsData?.data.find((u) => u.id === paymentId)?.name || "–",
    },
  ];

  return (
    <Card
      className="ClientsPaidTable"
      title={` Oylik yetkazuvchilar chiqimlari  ${
        data?.price ? data?.price.toLocaleString("uz-UZ") + " so'm" : "0"
      }`}
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
