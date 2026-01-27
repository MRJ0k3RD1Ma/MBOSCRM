import { Table } from "antd";
import { indexColumn } from "../../../components/tables/indexColumn";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useGetAllSubscribes } from "../../../config/queries/subscribe/subscribe-querys";
import { useState } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function SubscribePaidTable({
  fromDate,
  toDate,
}: {
  fromDate: string;
  toDate: string;
}) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filters] = useState<any>({});

  const { data: subscribes, isLoading } = useGetAllSubscribes({
    page,
    limit,
    fromDate: fromDate || undefined,
    toDate: toDate || undefined,
    ...filters,
    state: "PAID",
  });

  const columns = [
    indexColumn(page, limit),
    { title: "Mijoz", dataIndex: ["client", "name"] },
    { title: "Telefon raqami", dataIndex: ["client", "phone"] },
    {
      title: "Obuna narxi",
      dataIndex: "price",
      render: (v: number) =>
        v ? v.toLocaleString("uz-UZ") + " so'm" : "0 so'm",
    },
    {
      title: "To'langan",
      dataIndex: "paid",
      render: (v: number) =>
        v ? v.toLocaleString("uz-UZ") + " so'm" : "0 so'm",
    },
    {
      title: "Sana",
      dataIndex: "paying_date",
      render: (v: string) => (v ? dayjs(v).format("YYYY-MM-DD") : "-"),
    },
    {
      title: "Holati",
      dataIndex: "state",
      render: (v: string) => (v === "PAID" ? "To'langan" : "To'lanmagan"),
    },
  ];

  return (
    <div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={subscribes?.data || []}
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: limit,
          total: subscribes?.total || 0,
          onChange: setPage,
        }}
        onRow={(record: any) => ({
          onClick: (e) => {
            if (
              (e.target as HTMLElement).closest("button") ||
              (e.target as HTMLElement).closest("svg")
            )
              return;
            navigate(`/client/${record.client?.id}`);
          },
        })}
      />
    </div>
  );
}
