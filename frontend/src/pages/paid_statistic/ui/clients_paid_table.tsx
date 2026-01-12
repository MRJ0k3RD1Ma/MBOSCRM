import { Card, DatePicker, Table } from "antd";
import { indexColumn } from "../../../components/tables/indexColumn";
import { useGetAllClients } from "../../../config/queries/clients/clients-querys";
import { useGetAllSale } from "../../../config/queries/sale/sale-querys";
import { useGetAllPayments } from "../../../config/queries/payment/payment-querys";
import { useGetAllPaidClients } from "../../../config/queries/clients/paid-client-querys";
import { useState } from "react";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";
import Title from "antd/es/typography/Title";

const { RangePicker } = DatePicker;

dayjs.extend(utc);
dayjs.extend(timezone);

export default function ClientsPaidTable({
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
  const [page, setPage] = useState<number>(1);
  const [limit] = useState(10);

  const { data, isLoading } = useGetAllPaidClients({
    page,
    limit,
    fromDate: fromDate ? fromDate : undefined,
    toDate: toDate ? toDate : undefined,
  });
  const { data: clients } = useGetAllClients({ page: 1, limit: 1000 });
  const { data: sales } = useGetAllSale({ page: 1, limit: 1000 });
  const { data: payments } = useGetAllPayments({ page: 1, limit: 1000 });

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
      render: (text: string) => (text ? dayjs(text).format("YYYY-MM-DD") : "–"),
    },
    {
      title: "Narxi",
      dataIndex: "price",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
  ];

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">  
        <Title level={5} className="w-[80%]">
          Oylik mijoz daromadlari {data?.price?.toLocaleString("uz-UZ") || "0"} so'm
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
