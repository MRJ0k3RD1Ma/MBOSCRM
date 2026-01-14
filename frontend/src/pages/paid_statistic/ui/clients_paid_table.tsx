import { Table } from "antd";
import { indexColumn } from "../../../components/tables/indexColumn";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function ClientsPaidTable({
  clients,
  page,
  setPage,
  limit,
  setFilters,
}: any) {
  const navigate = useNavigate();

  const columns = [
    indexColumn(page, limit),
    { title: "Mijoz", dataIndex: "name" },
    { title: "Telefon raqami", dataIndex: "phone" },

    {
      title: "Umumiy to‘lov",
      dataIndex: "totalPaid",
      sortName: "totalPaid",
      sorter: true,
      render: (v: number) =>
        v ? v.toLocaleString("uz-UZ") + " so'm" : "0 so'm",
    },
    {
      title: "Mahsulotlar",
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
  ];

  return (
    <div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={clients?.data || []}
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
        onRow={(record) => ({
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
