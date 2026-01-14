import { Table } from "antd";
import dayjs from "dayjs";
import { indexColumn } from "../../../components/tables/indexColumn";
import timezone from "dayjs/plugin/timezone";
import { useMemo, useState } from "react";
import utc from "dayjs/plugin/utc";
import { useGetAllServers } from "../../../config/queries/server/servers-querys";

dayjs.extend(utc);
dayjs.extend(timezone);

type Payment = {
  id: number;
  name: string;
};

export default function ServerPaidTable({
  fromDate,
  toDate,
}: {
  fromDate: string;
  toDate: string;
}) {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading } = useGetAllServers({
    page,
    limit,
    fromDate: fromDate || undefined,
    toDate: toDate || undefined,
  });

  // 🔥 barcha payment turlarini yig‘ib olamiz
  const paymentTypes: Payment[] = useMemo(() => {
    const map = new Map<number, Payment>();

    data?.data?.forEach((server: any) => {
      server.payments?.forEach((p: Payment) => {
        map.set(p.id, p);
      });
    });

    return Array.from(map.values());
  }, [data]);

  const columns = useMemo(() => {
    return [
      indexColumn(page, limit),
      {
        title: "Server nomi",
        dataIndex: "name",
      },
      {
        title: "Umumiy to‘lov",
        dataIndex: "totalPrice",
        render: (v: number) => (v ? `${v.toLocaleString("uz-UZ")} so'm` : "0"),
      },

      ...paymentTypes.map((payment) => ({
        title: payment.name,
        key: `payment-${payment.id}`,
        render: (_: any, row: any) => {
          const found = row.payments?.find((p: any) => p.id === payment.id);
          return found?.price
            ? `${found.price.toLocaleString("uz-UZ")} so'm`
            : "0";
        },
      })),
    ];
  }, [page, limit, paymentTypes]);

  return (
    <div className="ClientsPaidTable">
      <Table
        columns={columns}
        dataSource={Array.isArray(data?.data) ? data.data : []}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total || 0,
          onChange: setPage,
        }}
      />
    </div>
  );
}
