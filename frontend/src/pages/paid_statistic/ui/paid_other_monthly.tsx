import { Card, Table } from "antd";

import { indexColumn } from "../../../components/tables/indexColumn";

import { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  useGetAllPaidOthers,
  type PaidOther,
} from "../../../config/queries/paid/paid-other";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function PaidOtherMonthly({
  type,
}: {
  type: "INCOME" | "OUTCOME";
}) {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading } = useGetAllPaidOthers({
    page,
    limit,
    type: type,
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
    <Card
      className="ClientsPaidTable"
      title={
        type === "INCOME"
          ? ` Oylik boshqa daromadlari ${
              data?.price ? data?.price.toLocaleString("uz-UZ") + " so'm" : `0`
            }`
          : ` Oylik boshqa chiqimlari ${
              data?.price ? data?.price.toLocaleString("uz-UZ") + " so'm" : `0`
            }`
      }
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
