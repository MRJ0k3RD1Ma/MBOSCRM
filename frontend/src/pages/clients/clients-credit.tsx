import { useState } from "react";
import { Button, Card, Input, Space, Table } from "antd";
import { useGetAllClients } from "../../config/queries/clients/clients-querys";
import { FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ClientsFilterModal from "./ui/clients-filter-modal";
import dayjs from "dayjs";
import { indexColumn } from "../../components/tables/indexColumn";

export default function ClientsCredit() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading } = useGetAllClients({
    page,
    limit,
    ...(search ? { name: search } : {}),
    ...filters,
    isPositiveBalance: false,
  });

  const columns = [
    indexColumn(page, limit),
    { title: "Name", dataIndex: "name" },
    { title: "INN", dataIndex: "inn" },
    { title: "Phone", dataIndex: "phone" },
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
        text
          ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD HH:mm:ss")
          : "—",
    },
  ];

  return (
    <Card>
      <Space
        direction="horizontal"
        style={{
          width: "100%",
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Space>
          <Input.Search
            placeholder="Mijoz nomi bo‘yicha qidirish"
            allowClear
            enterButton
            onSearch={(val) => {
              setSearch(val);
              setPage(1);
            }}
            style={{ maxWidth: 300 }}
          />
          <Button
            icon={<FilterOutlined />}
            onClick={() => setFilterModalOpen(!filterModalOpen)}
          >
            Filter
          </Button>
        </Space>
      </Space>
      <ClientsFilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={(values) => {
          setFilters(values);
          setPage(1);
        }}
        initialValues={filters}
      />
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
    </Card>
  );
}
