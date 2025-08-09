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
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  FileTextOutlined,
  FundOutlined,
  DollarOutlined,
} from "@ant-design/icons";
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

const { Title, Text } = Typography;

function formatMoney(value?: number) {
  if (value == null) return "0 so'm";
  return new Intl.NumberFormat("ru-RU").format(value) + " so'm";
}

type StatCardProps = {
  title: string;
  value: number | string | undefined;
  icon?: React.ReactNode;
  bg?: string;
  sub?: string | React.ReactNode;
};
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, bg, sub }) => {
  return (
    <Card
      style={{
        border: "none",
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        flex: 1,
        background: bg ?? "linear-gradient(135deg,#0f172a,#111827)",
        boxShadow: "0 6px 18px rgba(2,6,23,0.6)",
      }}
      bodyStyle={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        gap: 12,
        color: "#fff",
        height: "100%",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <Text style={{ color: "rgba(255,255,255,0.85)" }}>{title}</Text>
        <div style={{ marginTop: 8 }}>
          <Title
            level={3}
            style={{
              color: "#fff",
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {typeof value === "number" ? formatMoney(value) : value ?? "-"}
          </Title>
        </div>
        {sub && (
          <div style={{ marginTop: 8, color: "rgba(255,255,255,0.85)" }}>
            {sub}
          </div>
        )}
      </div>
      <div style={{ fontSize: 28, opacity: 0.95 }}>{icon}</div>
    </Card>
  );
};

export default function Dashboard() {
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

  return (
    <Card style={{ width: "100%" }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Title level={3} style={{ color: "#fff", margin: 0 }}>
          Statistika
        </Title>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Text style={{ color: "rgba(255,255,255,0.75)" }}>
            Yilni tanlang:
          </Text>
          <Select value={year} onChange={onYearChange} style={{ width: 120 }}>
            {years.map((y) => (
              <Select.Option key={y} value={y}>
                {y}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6} style={{ display: "flex" }}>
          <StatCard
            title="Mijozlar"
            value={stats.clients}
            icon={<UserOutlined style={{ fontSize: 22 }} />}
            bg="linear-gradient(135deg,#0f172a,#111827)"
          />
        </Col>
        <Col xs={24} sm={12} md={6} style={{ display: "flex" }}>
          <StatCard
            title="Daromadlar"
            value={stats.income}
            icon={<ArrowUpOutlined style={{ fontSize: 22 }} />}
            bg="linear-gradient(135deg,#16a34a,#22c55e)"
            sub={<span style={{ opacity: 0.9 }}>Oylik va yillik daromad</span>}
          />
        </Col>
        <Col xs={24} sm={12} md={6} style={{ display: "flex" }}>
          <StatCard
            title="Chiqimlar"
            value={stats.expenses}
            icon={<ArrowDownOutlined style={{ fontSize: 22 }} />}
            bg="linear-gradient(135deg,#b45309,#f59e0b)"
          />
        </Col>
        <Col xs={24} sm={12} md={6} style={{ display: "flex" }}>
          <StatCard
            title="Qarzlar"
            value={stats.debts}
            icon={<DollarOutlined style={{ fontSize: 22 }} />}
            bg="linear-gradient(135deg,#ef4444,#f97316)"
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 12 }}>
        <Col xs={24} sm={12} md={6} style={{ display: "flex" }}>
          <StatCard
            title="Shartnomalar"
            value={stats.contracts}
            icon={<FileTextOutlined style={{ fontSize: 22 }} />}
            bg="linear-gradient(135deg,#2563eb,#3b82f6)"
          />
        </Col>
        <Col xs={24} sm={12} md={6} style={{ display: "flex" }}>
          <StatCard
            title="Joriy oy daromadi"
            value={stats.currentMonthIncome}
            icon={<FundOutlined style={{ fontSize: 22 }} />}
            bg="linear-gradient(135deg,#059669,#10b981)"
          />
        </Col>
        <Col xs={24} sm={12} md={6} style={{ display: "flex" }}>
          <StatCard
            title="Joriy oy chiqimi"
            value={stats.currentMonthExpenses}
            icon={<ArrowDownOutlined style={{ fontSize: 22 }} />}
            bg="linear-gradient(135deg,#7c3aed,#a855f7)"
          />
        </Col>
        <Col xs={24} sm={12} md={6} style={{ display: "flex" }}>
          <Card
            style={{
              border: "none",
              borderRadius: 12,
              display: "flex",
              flexDirection: "column",
              flex: 1,
              background: "linear-gradient(135deg,#7c3aed,#a855f7)",
              boxShadow: "0 6px 18px rgba(2,6,23,0.6)",
            }}
            bodyStyle={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 8,
              padding: 16,
              height: "100%",
              color: "#fff",
            }}
          >
            <Text style={{ color: "rgba(255,255,255,0.9)" }}>Daromadlar</Text>
            <div>
              <Title level={4} style={{ color: "#fff", margin: 0 }}>
                {new Intl.NumberFormat("ru-RU").format(stats.yearlyIncome || 0)}{" "}
                so'm
              </Title>
              <Text style={{ color: "rgba(255,255,255,0.85)" }}>
                {currentYear - 1} —{" "}
                {new Intl.NumberFormat("ru-RU").format(
                  stats.lastYearIncome || 0
                )}{" "}
                so'm
              </Text>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={0} style={{ marginTop: 24 }}>
        <Col span={24} style={{ display: "flex", padding: 0 }}>
          <Card
            style={{
              width: "100%",
              borderRadius: 12,
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
              <Title level={5} style={{ margin: 0, color: "#fff" }}>
                Oylik: Tushum / Chiqim / Qarzdorlik
              </Title>
              <AntdTooltip title="Har bir ustun oylik qiymatni ko'rsatadi">
                <Text type="secondary">Ma'lumotlar</Text>
              </AntdTooltip>
            </div>

            <div style={{ flex: 1, minHeight: 360 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.06} />
                  <XAxis dataKey="monthLabel" stroke="rgba(255,255,255,0.6)" />
                  <YAxis
                    tickFormatter={(v) =>
                      v ? `${Math.round(v / 1000)}k` : "0"
                    }
                  />
                  <Tooltip formatter={(v: any) => moneyTooltip(v)} />
                  <Legend />
                  <Bar
                    dataKey="tushum"
                    name="Tushum"
                    fill="#22c55e"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="chiqim"
                    name="Chiqim"
                    fill="#f59e0b"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="qarzdorlik"
                    name="Qarzdorlik"
                    fill="#ef4444"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col span={24} style={{ display: "flex", padding: 0, marginTop: 24 }}>
          <Card
            style={{
              width: "100%",
              borderRadius: 12,
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
              <Title level={5} style={{ margin: 0, color: "#fff" }}>
                Kutilayotgan tushumlar
              </Title>
              <AntdTooltip title="Subscription forecast (oylik kutilayotgan tushumlar)">
                <Text type="secondary">Forecast</Text>
              </AntdTooltip>
            </div>

            <div style={{ flex: 1, minHeight: 360 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.06} />
                  <XAxis dataKey="monthLabel" stroke="rgba(255,255,255,0.6)" />
                  <YAxis
                    tickFormatter={(v) =>
                      v ? `${Math.round(v / 1000)}k` : "0"
                    }
                  />
                  <Tooltip formatter={(v: any) => moneyTooltip(v)} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="expected"
                    name="Kutilayotgan tushum"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
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
