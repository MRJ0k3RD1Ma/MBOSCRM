import { Button, DatePicker, Space, Table } from "antd";
import { indexColumn } from "../../../components/tables/indexColumn";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import ClientsPaidFilter from "./clients_paid_filter";
import { FilterOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

dayjs.extend(utc);
dayjs.extend(timezone);
export default function ClientsPaidTable({
  clients,
  fromDate,
  toDate,
  setDateFrom,
  setDateTo,
  page,
  setPage,
  limit,
  filters,
  setFilters,
  filterOpen,
  setFilterOpen,
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
      <Space
        style={{
          width: "100%",
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Space>
          <Button
            icon={<FilterOutlined />}
            onClick={() => setFilterOpen(!filterOpen)}
          >
            Filter
          </Button>
        </Space>
        <RangePicker
          style={{ width: "100%" }}
          format="YYYY-MM-DD"
          value={fromDate && toDate ? [dayjs(fromDate), dayjs(toDate)] : null}
          onChange={(_, [from, to]) => {
            setDateFrom(from);
            setDateTo(to);
            setPage(1);
          }}
        />
      </Space>

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
