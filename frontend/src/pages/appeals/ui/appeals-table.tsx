import { Table } from "antd";
import { indexColumn } from "../../../components/tables/indexColumn";
import {
  useGetAllAppeal,
  type Appeal,
} from "../../../config/queries/appeal/appeal-qurys";
import { useNavigate } from "react-router-dom";

interface SmsTableProps {
  page: number;
  setPage: (page: number) => void;
}

export default function AppealsTable({ page, setPage }: SmsTableProps) {
  const limit = 10;
  const navigate = useNavigate();

  const { data, isLoading } = useGetAllAppeal({
    page,
    limit,
  });

  const columns = [
    indexColumn(page, limit),
    { title: "Nomi", dataIndex: "name", key: "name" },
    { title: "Telefon raqami", dataIndex: "phone", key: "phone" },
    { title: "Mavzusi", dataIndex: "subject", key: "subject" },
    { title: "Holati", dataIndex: "state", key: "state" },
    {
      title: "Yaratilgan vaqt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => new Date(text).toLocaleString("uz-UZ"),
    },
  ];

  return (
    <Table<Appeal>
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
      onRow={(record) => ({
        onClick: () => navigate(`/appeal/${record.id}`),
        style: { cursor: "pointer" },
      })}
    />
  );
}
