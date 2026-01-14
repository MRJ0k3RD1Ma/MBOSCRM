import { Table } from "antd";
import dayjs from "dayjs";
import { indexColumn } from "../../../components/tables/indexColumn";
import timezone from "dayjs/plugin/timezone";
import { useGetAllSuppliers } from "../../../config/queries/supplier/supplier-querys";
import { useState } from "react";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function ({
  fromDate,
  toDate,
}: {
  fromDate: string;
  toDate: string;
  setDateFrom: (date: string) => void;
  setDateTo: (date: string) => void;
}) {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data, isLoading } = useGetAllSuppliers({
    page,
    limit,
    fromDate: fromDate || undefined,
    toDate: toDate || undefined,
  });

  const columns = [
    indexColumn(page, limit),
    {
      title: "Yetkazuvchi",
      dataIndex: "name",
    },
    { title: "Telefon raqami", dataIndex: "phone" },
    {
      title: "Yetkazuvchilarga to‘langan jami",
      dataIndex: "arrivedPrice",
      render: (dept: number) =>
        dept ? dept.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "Umumiy to‘lov",
      dataIndex: "paidPrice",
      render: (dept: number) =>
        dept ? dept.toLocaleString("uz-UZ") + " so'm" : "0",
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
    <div className="ClientsPaidTable">
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
    </div>
  );
}
