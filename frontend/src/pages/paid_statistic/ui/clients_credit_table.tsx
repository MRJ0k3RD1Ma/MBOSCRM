import { Table } from "antd";
import { indexColumn } from "../../../components/tables/indexColumn";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import ClientsPaidFilter from "./clients_paid_filter";
import { useGetAllClients } from "../../../config/queries/clients/clients-querys";
import { useState } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function ClientsCreditTable({
  fromDate,
  toDate,
}: {
  fromDate: string;
  toDate: string;
}) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filters, setFilters] = useState<any>({});
  const [filterOpen, setFilterOpen] = useState(false);

  const { data: clients, isLoading } = useGetAllClients({
    page,
    limit,
    fromDate: fromDate || undefined,
    toDate: toDate || undefined,
    ...filters,
    isPositiveBalance: false,
  });

  const columns = [
    indexColumn(page, limit),
    { title: "Mijoz", dataIndex: "name" },
    { title: "Mijoz inn raqami", dataIndex: "inn" },
    { title: "Telefon raqami", dataIndex: "phone" },
    { title: "Mijoz Turi", dataIndex: ["ClientType", "name"] },
    {
      title: "Sotuvlar",
      dataIndex: "totalSale",
      sortName: "totalSale",
      sorter: true,
      render: (v: number) =>
        v ? v.toLocaleString("uz-UZ") + " so'm" : "0 so'm",
    },
    {
      title: "Obuna",
      dataIndex: "totalSubscription",
      sortName: "totalSub",
      sorter: true,
      render: (v: number) =>
        v ? v.toLocaleString("uz-UZ") + " so'm" : "0 so'm",
    },
    {
      title: "Balansi",
      dataIndex: "balance",
      sortName: "totalBalance",
      sorter: true,
      render: (v: number) =>
        v ? v.toLocaleString("uz-UZ") + " so'm" : "0 so'm",
    },
    {
      title: "So‘nggi yangilanish",
      dataIndex: "updatedAt",
      render: (v: number) => (v ? dayjs(v).format("YYYY-MM-DD") : "–"),
    },
  ];

  return (
    <div>
      <ClientsPaidFilter
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        initialValues={filters}
        onApply={(values) => {
          setFilters(values);
          setPage(1);
        }}
      />

      <Table
        rowKey="id"
        columns={columns}
        dataSource={clients?.data || []}
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: limit,
          total: clients?.total || 0,
          onChange: setPage,
        }}
        onChange={(_, __, sorter: any) => {
          if (!sorter.field) return;

          setFilters((prev: any) => ({
            ...prev,
            sortBy: sorter.column.sortName,
            sortOrder: sorter.order === "ascend" ? "asc" : "desc",
          }));
        }}
        onRow={(record: any) => ({
          onClick: (e) => {
            if (
              (e.target as HTMLElement).closest("button") ||
              (e.target as HTMLElement).closest("svg")
            )
              return;
            navigate(`/client/${record.id}`);
          },
        })}
      />
    </div>
  );
}
