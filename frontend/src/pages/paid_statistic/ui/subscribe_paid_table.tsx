import { Card, DatePicker, Table } from "antd";
import { indexColumn } from "../../../components/tables/indexColumn";
import { useState } from "react";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";
import Title from "antd/es/typography/Title";
import { useGetAllSubscribes } from "../../../config/queries/subscribe/subscribe-querys";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;

dayjs.extend(utc);
dayjs.extend(timezone);

export default function SubscribePaidTable({
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
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [limit] = useState(10);

  const { data, isLoading } = useGetAllSubscribes({
    state: "NOTPAYING",
    page,
    limit,
    fromDate: fromDate ? fromDate : undefined,
    toDate: toDate ? toDate : undefined,
  });

  const columns = [
    indexColumn(page, limit),
    {
      title: "To‘lov sanasi",
      dataIndex: "paying_date",
      render: (date: string) =>
        dayjs.utc(date).tz("Asia/Tashkent").format("YYYY-MM-DD"),
    },
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
      title: "Mijoz",
      dataIndex: "client",
      render: (client: any) => client?.name || "Noma'lum",
    },
    {
      title: "Sotuv",
      dataIndex: "sale",
      render: (sale: any) => sale?.id || "-",
    },
    {
      title: "Narx",
      dataIndex: "price",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
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
