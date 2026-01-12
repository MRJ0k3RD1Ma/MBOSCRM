import { Card, DatePicker, Table } from "antd";
import { indexColumn } from "../../../components/tables/indexColumn";
import { useState } from "react";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";
import Title from "antd/es/typography/Title";
import { useGetAllClients } from "../../../config/queries/clients/clients-querys";

const { RangePicker } = DatePicker;

dayjs.extend(utc);
dayjs.extend(timezone);

export default function ClientsCreditTable({
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

  const { data, isLoading } = useGetAllClients({
    isPositiveBalance: false,
    page,
    limit,
    fromDate: fromDate ? fromDate : undefined,
    toDate: toDate ? toDate : undefined,
  });

  const columns = [
    indexColumn(page, limit),
    { title: "Nomi", dataIndex: "name" },
    { title: "INN", dataIndex: "inn" },
    { title: "Telefon", dataIndex: "phone" },
    { title: "Mijoz turi", dataIndex: ["ClientType", "name"] },
    {
      title: "Balans",
      dataIndex: "balance",
      render: (balance: number) =>
        balance ? balance.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "So'ngi o'zgarish",
      dataIndex: "updatedAt",
      render: (text: string) =>
        text ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD") : "—",
    },
  ];

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title level={5} className="w-[80%]">
          {/* Oylik obuna qarzdorligi {data?.price.toLocaleString("uz-UZ")} so'm */}
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
