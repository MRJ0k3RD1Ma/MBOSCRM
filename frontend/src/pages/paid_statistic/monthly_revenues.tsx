import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ClientsPaidTable from "./ui/clients_paid_table";
import { Button, Card, DatePicker, Space } from "antd";
import { TrendingUp } from "lucide-react";
import { formatMoney } from "../../hooks/format/format_money";
import { useThemeContext } from "../../providers/theme-provider";
import { useGetAllClients } from "../../config/queries/clients/clients-querys";
import { StatCard } from "./ui/stat-card";
import dayjs from "dayjs";
import { FilterOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

export default function MonthlyRevenues() {
  const { theme } = useThemeContext();

  const isDark = theme === "dark";
  const titleColor = isDark ? "" : "text-gray-800";
  const [searchParams] = useSearchParams();

  const [page, setPage] = useState<number>(1);
  const [limit] = useState(10);

  const [dateFrom, setDateFrom] = useState(searchParams.get("dateFrom") || "");
  const [dateTo, setDateTo] = useState(searchParams.get("dateTo") || "");

  const [filters, setFilters] = useState<any>({});
  const [filterOpen, setFilterOpen] = useState(false);

  const { data: clients } = useGetAllClients({
    page,
    limit,
    fromDate: dateFrom || undefined,
    toDate: dateTo || undefined,
    ...filters,
  });

  const statsCards = [
    {
      title: "Mijozlar daromadi",
      value: formatMoney(clients?.totals.price || 0),
      icon: <TrendingUp size={32} color="white" />,
      bgColor: "!bg-[#0EAF69]",
      textColor: titleColor,
      isDark: isDark,
    },
    {
      title: "Obuna daromadi",
      value: formatMoney(clients?.totals.subscribe || 0),
      icon: <TrendingUp size={32} color="white" />,
      bgColor: "!bg-[#0EAF69]",
    },
    {
      title: "Sotuvlar daromadi",
      value: formatMoney(clients?.totals.device || 0),
      icon: <TrendingUp size={32} color="white" />,
      bgColor: "!bg-[#0EAF69]",
      textColor: titleColor,
      isDark: isDark,
    },
    {
      title: "Xizmatlar daromadi",
      value: formatMoney(clients?.totals.service || 0),
      icon: <TrendingUp size={32} color="white" />,
      bgColor: "!bg-[#0EAF69]",
      textColor: titleColor,
      isDark: isDark,
    },
  ];

  useEffect(() => {
    setDateFrom(searchParams.get("dateFrom") || "");
    setDateTo(searchParams.get("dateTo") || "");
  }, [searchParams]);

  return (
    <Card>
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
          value={dateFrom && dateTo ? [dayjs(dateFrom), dayjs(dateTo)] : null}
          onChange={(_, [from, to]) => {
            setDateFrom(from);
            setDateTo(to);
            setPage(1);
          }}
        />
      </Space>
      <div className="flex justify-between mb-6 gap-4 ">
        {statsCards.map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            bgColor={card.bgColor}
          />
        ))}
      </div>
      <ClientsPaidTable
        clients={clients}
        fromDate={dateFrom}
        toDate={dateTo}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
        page={page}
        setPage={setPage}
        limit={limit}
        filters={filters}
        setFilters={setFilters}
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
      />
    </Card>
  );
}
