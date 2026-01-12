import { Card, DatePicker, Table } from "antd";

import dayjs from "dayjs";
import { indexColumn } from "../../../components/tables/indexColumn";
import timezone from "dayjs/plugin/timezone";
import { useGetAllPaidServers } from "../../../config/queries/server/paid-servers-querys";
import { useState } from "react";
import utc from "dayjs/plugin/utc";
import Title from "antd/es/typography/Title";

const { RangePicker } = DatePicker;

dayjs.extend(utc);
dayjs.extend(timezone);

export default function ServerPaidTable({
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

  const { data, isLoading } = useGetAllPaidServers({
    page,
    limit,
  });

  const columns = [
    indexColumn(page, limit),
    {
      title: "To'lov turi",
      dataIndex: ["server", "name"],
    },
    {
      title: "To'lov turi",
      dataIndex: ["paymentType", "name"],
    },
    {
      title: "Narxi",
      dataIndex: "price",
      render: (price: number) => `${price.toLocaleString()} so'm`,
    },
    {
      title: "Sanasi",
      dataIndex: "createdAt",
      render: (val: string) => dayjs(val).format("YYYY-MM-DD"),
    },
    {
      title: "Izoh",
      dataIndex: "description",
    },
  ];
  return (
    <Card className="ClientsPaidTable">
      <div className="flex justify-between items-center mb-4">
        <Title level={5} className="w-[80%]">
          Oylik server chiqimlari {data?.price?.toLocaleString("uz-UZ") || "0"} so'm
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
        dataSource={Array.isArray(data?.data) ? data.data : []}
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
