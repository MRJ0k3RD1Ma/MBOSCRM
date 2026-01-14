import { Table } from "antd";
import { useState } from "react";
import { type PaidOther } from "../../../config/queries/paid/paid-other";
import { indexColumn } from "../../../components/tables/indexColumn";
import { useGetAllPaidOtherGroups } from "../../../config/queries/paid/paid-other-group";

export default function PaidOtherMonthly({
  fromDate,
  toDate,
}: {
  fromDate: string;
  toDate: string;
}) {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState(10);

  const { data, isLoading } = useGetAllPaidOtherGroups({
    page,
    limit,
    fromDate: fromDate || undefined,
    toDate: toDate || undefined,
  });

  const columns = [
    indexColumn(page, limit),
    {
      title: "Guruh nomi",
      dataIndex: "name",
    },
    {
      title: "Turi",
      dataIndex: "type",
      render: (type: PaidOther["type"]) =>
        type === "INCOME" ? "Kirim" : "Chiqim",
    },
    {
      title: "Jami chiqim",
      dataIndex: "totalOutcome",
      render: (priceCount: number) =>
        priceCount ? priceCount.toLocaleString("uz-UZ") + " so'm" : "0",
    },
  ];

  return (
    <div>
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
    </div>
  );
}
