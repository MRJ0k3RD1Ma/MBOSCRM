import { Card, DatePicker, Table } from "antd";
import { indexColumn } from "../../../components/tables/indexColumn";
import { useState } from "react";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";
import Title from "antd/es/typography/Title";
import { useGetAllSuppliers } from "../../../config/queries/supplier/supplier-querys";

const { RangePicker } = DatePicker;

dayjs.extend(utc);
dayjs.extend(timezone);

export default function SupplierCreditTable({
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

  const { data, isLoading } = useGetAllSuppliers({
    isPositiveBalance: false,
    page,
    limit,
    fromDate: fromDate ? fromDate : undefined,
    toDate: toDate ? toDate : undefined,
  });
  const columns = [
    indexColumn(page, limit),
    { title: "Nomi", dataIndex: "name" },
    { title: "Telefon", dataIndex: "phone" },
    { title: "Qo‘shimcha telefon", dataIndex: "phoneTwo" },
    { title: "Izoh", dataIndex: "description" },
    {
      title: "Balans",
      dataIndex: "balance",
      render: (dept: number) =>
        dept ? dept.toLocaleString("uz-UZ") + " so'm" : "0",
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
