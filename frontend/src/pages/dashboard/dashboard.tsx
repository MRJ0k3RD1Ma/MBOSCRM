import React, { useMemo, useState } from "react";
import {
  Card,
  Col,
  Row,
  Select,
  Typography,
  Spin,
  Tooltip as AntdTooltip,
} from "antd";
import {
  Users,
  FileText,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import dayjs from "dayjs";
import {
  useGetStatistics,
  type StatisticsResponse,
} from "../../config/queries/statistics/statistics-querys";
import { useThemeContext } from "../../providers/theme-provider";

const { Title, Text } = Typography;

function formatMoney(value?: number) {
  if (value == null) return "0 so'm";
  return new Intl.NumberFormat("ru-RU").format(value) + " so'm";
}

type StatCardProps = {
  title: string;
  value: number | string | undefined;
  icon: React.ReactNode;
  textColor?: string;
  subtitle?: string | React.ReactNode;
  bgColor: string;
  isDark: boolean;
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  textColor,
  subtitle,
  bgColor,
  isDark,
}) => {
  return (
    <Card
      className={`!border ${
        isDark ? "!border-white/20 !bg-white/10" : "!border-gray-200 !bg-white"
      } !shadow-lg !hover:shadow-xl !transition-all !duration-300 hover:scale-[1.03] !backdrop-blur-xl !rounded-2xl`}
      bodyStyle={{
        padding: "16px",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p
            className={`text-sm ${textColor} opacity-90 mb-1`}
            style={{ fontWeight: 500 }}
          >
            {title}
          </p>
          <h3 className={`text-2xl font-bold ${textColor} mb-1`}>
            {value ?? "-"}
          </h3>
          {subtitle && (
            <div className={`text-sm ${textColor} opacity-80`}>{subtitle}</div>
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

export default function Dashboard() {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  const currentYear = dayjs().year();
  const [year, setYear] = useState<number>(currentYear);

  const years = useMemo(() => {
    const arr = [];
    for (let y = 2024; y <= 2025; y++) {
      arr.push(y);
    }
    return arr;
  }, []);

  const { data, isLoading } = useGetStatistics({ year });

  const onYearChange = (y: number) => {
    setYear(y);
  };

  const monthlyRaw = data?.charts?.monthlyStats || [];
  const monthlyData = useMemo(() => {
    const monthNames = [
      "Yan",
      "Fev",
      "Mar",
      "Apr",
      "May",
      "Iyun",
      "Iyul",
      "Avg",
      "Sen",
      "Okt",
      "Noy",
      "Dek",
    ];
    return monthlyRaw.map((m: any) => ({
      ...m,
      monthLabel: monthNames[(m.month || 1) - 1] || String(m.month),
    }));
  }, [monthlyRaw]);

  const forecastRaw = data?.charts?.subscriptionForecast || [];
  const forecastData = useMemo(() => {
    return forecastRaw.map((val: number, idx: number) => ({
      month: idx + 1,
      monthLabel:
        [
          "Yan",
          "Fev",
          "Mar",
          "Apr",
          "May",
          "Iyun",
          "Iyul",
          "Avg",
          "Sen",
          "Okt",
          "Noy",
          "Dek",
        ][idx] || String(idx + 1),
      expected: val,
    }));
  }, [forecastRaw]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  const stats: StatisticsResponse["totals"] = data?.totals || {
    clients: 0,
    contracts: 0,
    income: 0,
    expenses: 0,
    debts: 0,
    currentMonthIncome: 0,
    currentMonthExpenses: 0,
    yearlyIncome: 0,
    lastYearIncome: 0,
  };

  const moneyTooltip = (v: any) =>
    v == null ? "-" : new Intl.NumberFormat("ru-RU").format(v) + " so'm";

  const titleColor = isDark ? "" : "text-gray-800";
  const subtitleColor = isDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.65)";
  const chartTextColor = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.65)";
  const chartGridColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const cardTitleColor = isDark ? "#fff" : "rgba(0,0,0,0.85)";
  const cardBgColor = isDark ? "rgba(255,255,255,0.02)" : "#fff";
  const cardBorderColor = isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0";

  return (
    <Card style={{ width: "100%" }}>
      <div className="w-full flex items-center justify-between mb-6">
        <div className="gap-3">
          <h1 className={`text-2xl font-bold ${titleColor}`}>Statistika</h1>
        </div>
        <div className="flex items-center gap-3">
          <Text style={{ color: subtitleColor }}>Yilni tanlang:</Text>
          <Select value={year} onChange={onYearChange} style={{ width: 120 }}>
            {years.map((y) => (
              <Select.Option key={y} value={y}>
                {y}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>

      {/* Stat cards */}
      <div className="!grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Mijozlar"
          value={`${stats.clients} dona`}
          icon={<Users size={32} color="white" />}
          bgColor="!bg-[#001529]"
          textColor={titleColor}
          isDark={isDark}
        />
        <StatCard
          title="Daromadlar"
          value={formatMoney(stats.income)}
          icon={<TrendingUp size={32} color="white" />}
          bgColor="!bg-[#0EAF69]"
          textColor={titleColor}
          isDark={isDark}
        />
        <StatCard
          title="Chiqimlar"
          value={formatMoney(stats.expenses)}
          icon={<TrendingDown size={32} color="white" />}
          bgColor="!bg-[#F59E0B]"
          textColor={titleColor}
          isDark={isDark}
        />
        <StatCard
          title="Qarzdorlik"
          value={formatMoney(stats.debts)}
          icon={<TrendingDown size={32} color="white" />}
          bgColor="!bg-[#EF4444]"
          textColor={titleColor}
          isDark={isDark}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Shartnomalar"
          value={`${stats.contracts} dona`}
          icon={<FileText size={32} color="white" />}
          bgColor="!bg-[#3B82F6]"
          textColor={titleColor}
          isDark={isDark}
        />
        <StatCard
          title="Oylikdagi daromadlar"
          value={formatMoney(stats.currentMonthIncome)}
          icon={<TrendingUp size={32} color="white" />}
          bgColor="!bg-[#4CAF50]"
          textColor={titleColor}
          isDark={isDark}
        />
        <StatCard
          title="Oylikdagi chiqimlar"
          value={formatMoney(stats.currentMonthExpenses)}
          icon={<TrendingDown size={32} color="white" />}
          bgColor="!bg-[#F59E0B]"
          textColor={titleColor}
          isDark={isDark}
        />
        <StatCard
          title="Solishtirma daromadlar"
          value=""
          isDark={isDark}
          textColor={titleColor}
          icon={<DollarSign size={32} color="white" />}
          bgColor="!bg-[#4CAF50]"
          subtitle={
            <div className="space-y-1">
              <div className="!font-semibold text-xl">
                {currentYear} - yil:{" "}
                {new Intl.NumberFormat("ru-RU").format(stats.yearlyIncome || 0)}{" "}
                so'm
              </div>
              <div className="!text-sm !opacity-80">
                {currentYear - 1} - yil:{" "}
                {new Intl.NumberFormat("ru-RU").format(
                  stats.lastYearIncome || 0
                )}{" "}
                so'm
              </div>
            </div>
          }
        />
      </div>
      <Row gutter={0} style={{ marginTop: 24 }}>
        <Col span={24} style={{ display: "flex", padding: 0 }}>
          <Card
            style={{
              width: "100%",
              borderRadius: 12,
              backgroundColor: cardBgColor,
              borderColor: cardBorderColor,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
            bodyStyle={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              flex: 1,
              padding: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Title level={5} style={{ margin: 0, color: cardTitleColor }}>
                Oylik: Tushum / Chiqim / Qarzdorlik
              </Title>
              <AntdTooltip title="Har bir ustun oylik qiymatni ko'rsatadi">
                <Text type="secondary">Ma'lumotlar</Text>
              </AntdTooltip>
            </div>

            <div
              style={{ flex: 1, minHeight: 360 }}
              className="!overflow-hidden"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={chartGridColor}
                  />
                  <XAxis
                    dataKey="monthLabel"
                    stroke={chartTextColor}
                    fontSize={12}
                  />
                  <YAxis
                    stroke={chartTextColor}
                    fontSize={12}
                    tickFormatter={(v) =>
                      v ? `${Math.round(v / 1000)}k` : "0"
                    }
                  />
                  <Tooltip
                    formatter={(v: any) => moneyTooltip(v)}
                    contentStyle={{
                      backgroundColor: isDark
                        ? "rgba(0,0,0,0.8)"
                        : "rgba(255,255,255,0.95)",
                      border: `1px solid ${
                        isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"
                      }`,
                      borderRadius: "8px",
                      color: isDark ? "#fff" : "#000",
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      color: chartTextColor,
                      fontSize: "12px",
                    }}
                  />
                  <Bar
                    dataKey="tushum"
                    name="Tushum"
                    fill="#22c55e"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="chiqim"
                    name="Chiqim"
                    fill="#f59e0b"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="qarzdorlik"
                    name="Qarzdorlik"
                    fill="#ef4444"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col
          span={24}
          style={{
            display: "flex",
            padding: 0,
            marginTop: 24,
          }}
        >
          <Card
            style={{
              width: "100%",
              borderRadius: 12,
              backgroundColor: cardBgColor,
              borderColor: cardBorderColor,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
            bodyStyle={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              flex: 1,
              padding: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Title level={5} style={{ margin: 0, color: cardTitleColor }}>
                Kutilayotgan tushumlar
              </Title>
            </div>

            <div
              style={{ flex: 1, minHeight: 360 }}
              className="!overflow-hidden"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={chartGridColor}
                  />
                  <XAxis
                    dataKey="monthLabel"
                    stroke={chartTextColor}
                    fontSize={12}
                  />
                  <YAxis
                    stroke={chartTextColor}
                    fontSize={12}
                    tickFormatter={(v) =>
                      v ? `${Math.round(v / 1000)}k` : "0"
                    }
                  />
                  <Tooltip
                    formatter={(v: any) => moneyTooltip(v)}
                    contentStyle={{
                      backgroundColor: isDark
                        ? "rgba(0,0,0,0.8)"
                        : "rgba(255,255,255,0.95)",
                      border: `1px solid ${
                        isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"
                      }`,
                      borderRadius: "8px",
                      color: isDark ? "#fff" : "#000",
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      color: chartTextColor,
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="expected"
                    name="Kutilayotgan tushum"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#3b82f6" }}
                    activeDot={{ r: 6, fill: "#3b82f6" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}
