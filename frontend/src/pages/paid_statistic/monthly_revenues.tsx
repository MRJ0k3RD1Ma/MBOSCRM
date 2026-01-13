import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ClientsPaidTable from "./ui/clients_paid_table";
import { Card } from "antd";
import { TrendingUp } from "lucide-react";
import { formatMoney } from "../../hooks/format/format_money";
import { useThemeContext } from "../../providers/theme-provider";
import { useGetAllClients } from "../../config/queries/clients/clients-querys";
type StatCardProps = {
  title: string;
  value: number | string | undefined;
  icon: React.ReactNode;
  textColor?: string;
  subtitle?: string | React.ReactNode;
  bgColor: string;
  isDark: boolean;
  link?: string;
};

export default function MonthlyRevenues() {
  const { theme } = useThemeContext();
  const [searchParams] = useSearchParams();

  const isDark = theme === "dark";
  const titleColor = isDark ? "" : "text-gray-800";

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
      textColor: titleColor,
      isDark: isDark,
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

  const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon,
    textColor,
    subtitle,
    bgColor,
    isDark,
    link,
  }) => {
    return (
      <Card
        className={`!border w-full ${
          isDark
            ? "!border-white/20 !bg-white/10"
            : "!border-gray-200 !bg-white"
        } !shadow-lg !hover:shadow-xl !transition-all !duration-300 hover:scale-[1.03] !backdrop-blur-xl !rounded-2xl`}
        bodyStyle={{
          padding: "16px",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{ cursor: link ? "pointer" : "default" }}
        >
          <div className="flex-1">
            <p
              className={`text-lg ${textColor} opacity-90 mb-1`}
              style={{ fontWeight: 500 }}
            >
              {title}
            </p>
            <h3 className={`text-2xl font-bold ${textColor} mb-1`}>
              {value ?? "-"}
            </h3>
            {subtitle && (
              <div className={`text-sm ${textColor} opacity-80`}>
                {subtitle}
              </div>
            )}
          </div>
          <div
            className={`!p-3 !rounded-full ${bgColor} !backdrop-blur-sm flex items-center justify-center`}
            style={{
              minWidth: "50px",
              minHeight: "50px",
            }}
          >
            {icon}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <Card>
      <div className="flex justify-between mb-6 gap-4 ">
        {statsCards.map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            bgColor={card.bgColor}
            textColor={card.textColor}
            isDark={card.isDark}
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
