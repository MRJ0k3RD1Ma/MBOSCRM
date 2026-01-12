import { Card, DatePicker, Table } from "antd";
import { useState } from "react";
import {
  useGetAllPaidOthers,
  type PaidOther,
} from "../../../config/queries/paid/paid-other";
import { indexColumn } from "../../../components/tables/indexColumn";
import dayjs from "dayjs";
import Title from "antd/es/typography/Title";

const { RangePicker } = DatePicker;

export default function PaidOtherMonthly({
  fromDate,
  toDate,
  type,
  setDateFrom,
  setDateTo,
}: {
  fromDate: string;
  toDate: string;
  type: "INCOME" | "OUTCOME";
  setDateFrom: (date: string) => void;
  setDateTo: (date: string) => void;
}) {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState(10);

  const { data, isLoading } = useGetAllPaidOthers({
    page,
    limit,
    type,
    fromDate,
    toDate,
  });

  const columns = [
    indexColumn(page, limit),
    {
      title: "Guruh",
      dataIndex: "groupId",
      render: (_: any, row: PaidOther) => row.group?.name || "–",
    },
    {
      title: "Turi",
      dataIndex: "type",
      render: (type: PaidOther["type"]) =>
        type === "INCOME" ? "Kirim" : "Chiqim",
    },
    {
      title: "To‘lov miqdori",
      dataIndex: "price",
      render: (priceCount: number) =>
        priceCount ? priceCount.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "To‘langan sana",
      dataIndex: "paidDate",
      render: (text: string) => (text ? dayjs(text).format("YYYY-MM-DD") : "–"),
    },
    { title: "Izoh", dataIndex: "description" },
  ];

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title level={5} className="w-[80%]">
          Oylik boshqa {type === "INCOME" ? "daromadlari " : "chiqimlari "}
          {data?.price?.toLocaleString("uz-UZ") || "0"} so'm
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
