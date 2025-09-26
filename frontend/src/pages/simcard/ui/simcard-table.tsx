import { Table } from "antd";
import { indexColumn } from "../../../components/tables/indexColumn";
import {
  useGetAllAppeal,
  type Appeal,
} from "../../../config/queries/appeal/appeal-qurys";

interface SmsTableProps {
  page: number;
  setPage: (page: number) => void;
}

export default function SimCardTable({ page, setPage }: SmsTableProps) {
  const limit = 10;

  const { data, isLoading } = useGetAllAppeal({
    page,
    limit,
  });

  const columns = [
    indexColumn(page, limit),
    { title: "Kompaniya", dataIndex: "Kompaniya", key: "Kompaniya" },
    { title: "Raqami", dataIndex: "phone", key: "phone" },
    { title: "Tashkiloti", dataIndex: "Tashkiloti", key: "Tashkiloti" },
    { title: "Mijoz nomi", dataIndex: "Mijoz nomi", key: "Mijoz nomi" },
    { title: "Izoh", dataIndex: "Izoh", key: "Izoh" },
    { title: "Holati", dataIndex: "Holati", key: "Holati" },
    {
      title: "Aktiv qilingan sana",
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
    />
  );
}
