import { Card, DatePicker, Table } from "antd";

import dayjs from "dayjs";
import { indexColumn } from "../../../components/tables/indexColumn";
import timezone from "dayjs/plugin/timezone";
import { useGetAllPaidSuppliers } from "../../../config/queries/supplier/paid-supplier-querys";
import { useGetAllPayments } from "../../../config/queries/payment/payment-querys";
import { useGetAllSuppliers } from "../../../config/queries/supplier/supplier-querys";
import { useState } from "react";
import utc from "dayjs/plugin/utc";
import Title from "antd/es/typography/Title";

const { RangePicker } = DatePicker;

dayjs.extend(utc);
dayjs.extend(timezone);

export default function ({
  fromDate,
  toDate,
  setDateFrom,
  setDateTo,
}: {
  fromDate: string;
  toDate: string;
  setDateFrom: (date: string) => void;
  setDateTo: (date: string) => void;
}) {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data: suppliersData } = useGetAllSuppliers({ page: 1, limit: 1000 });
  const { data: paymentsData } = useGetAllPayments({ page: 1, limit: 1000 });

  const { data, isLoading } = useGetAllPaidSuppliers({
    page,
    limit,
    fromDate,
    toDate,
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
    <Card className="ClientsPaidTable">
      <div className="flex justify-between items-center mb-4">
        <Title level={5} className="w-[80%]">
          Oylik yetkazuvchilar chiqimlari {data?.price?.toLocaleString("uz-UZ") || "0"} so'm
        </Title>
        <RangePicker
          placeholder={["Boshlanish sanasi", "Tugash sanasi"]}
          style={{ width: "100%" }}
          format="YYYY-MM-DD"
          value={fromDate && toDate ? [dayjs(fromDate), dayjs(toDate)] : null}
          onChange={(dates, dateStrings) => {
            setDateFrom(dateStrings[0]);
            setDateTo(dateStrings[1]);
            console.log(dates);
          }}
        />
      </div>
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
