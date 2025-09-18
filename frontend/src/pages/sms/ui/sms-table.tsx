import { Card, Table } from "antd";

import { indexColumn } from "../../../components/tables/indexColumn";
import { useGetAllSms, type Sms } from "../../../config/queries/sms/sms-querys";

interface SmsTableProps {
  search: string;
  page: number;
  setPage: (page: number) => void;
}

export default function SmsTable({ search, page, setPage }: SmsTableProps) {
  const limit = 10;

  const { data, isLoading } = useGetAllSms({
    page,
    limit,
    message: search || undefined,
  });

  const columns = [
    indexColumn(page, limit),
    { title: "Telefon raqam", dataIndex: "phone_number", key: "phone_number" },
    { title: "Xabar", dataIndex: "message", key: "message" },
    { title: "Holat", dataIndex: "state", key: "state" },
    { title: "Soni", dataIndex: "count", key: "count" },
    { title: "Narxi", dataIndex: "price", key: "price" },
    {
      title: "Yaratilgan vaqt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => new Date(text).toLocaleString("uz-UZ"),
    },
    {
      title: "Yangilangan vaqt",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text: string) => new Date(text).toLocaleString("uz-UZ"),
    },
  ];

  return (
    <Table<Sms>
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
  );
}
