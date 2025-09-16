import { Table } from "antd";
import dayjs from "dayjs";
import { indexColumn } from "../../../components/tables/indexColumn";
import { useGetAllClients } from "../../../config/queries/clients/clients-querys";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ClientsOverPaidTable({
  page,
  search,
  filters,
  setPage,
}: {
  page: number;
  search: string;
  filters: Record<string, string>;
  setPage: (page: number) => void;
}) {
  const navigate = useNavigate();
  const [limit] = useState(10);

  const { data, isLoading } = useGetAllClients({
    page,
    limit,
    ...(search ? { name: search } : {}),
    ...filters,
    isPositiveBalance: true,
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
    <div className="clients-over-paid-table">
      <Table
        columns={columns}
        dataSource={data?.data || []}
        loading={isLoading}
        rowKey="id"
        onRow={(record) => ({
          onClick: (e) => {
            if (
              (e.target as HTMLElement).closest("button") ||
              (e.target as HTMLElement).closest("svg")
            ) {
              return;
            }
            navigate(`/client/${record.id}`);
          },
        })}
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total,
          onChange: (page) => setPage(page),
        }}
      />
    </div>
  );
}
