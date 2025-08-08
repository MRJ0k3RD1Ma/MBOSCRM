import { Card, Col, Row, Select, Typography, Spin, Button } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
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

export default function Dashboard() {
  const { data, isLoading } = useGetStatistics();
  const currentYear = dayjs().year();

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

  const monthlyData = data?.charts?.monthlyStats || [];
  const forecastData =
    data?.charts?.subscriptionForecast?.map((val: number, idx: number) => ({
      month: idx + 1,
      expected: val,
    })) || [];

  const cardStyle: React.CSSProperties = {
    borderRadius: 12,
    padding: "12px 20px",
    color: "#fff",
    height: "100%",
  };

  return (
    <div style={{ padding: 20, background: "#0f172a", minHeight: "100vh" }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Title level={3} style={{ color: "#fff" }}>
          Statistika
        </Title>
        <Select defaultValue={currentYear} style={{ width: 120 }}>
          {[currentYear, currentYear - 1].map((y) => (
            <Select.Option key={y} value={y}>
              {y}
            </Select.Option>
          ))}
        </Select>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card style={{ ...cardStyle, background: "#1E293B" }}>
            <Title level={3} style={{ color: "#fff" }}>
              {stats.clients}
            </Title>
            <Text style={{ color: "#fff" }}>
              <UserOutlined /> Mijozlar
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card style={{ ...cardStyle, background: "#22c55e" }}>
            <Title level={3} style={{ color: "#fff" }}>
              {stats.income?.toLocaleString()}
            </Title>
            <Text style={{ color: "#fff" }}>
              <ArrowUpOutlined /> Daromadlar
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card style={{ ...cardStyle, background: "#eab308" }}>
            <Title level={3} style={{ color: "#fff" }}>
              {stats.expenses?.toLocaleString()}
            </Title>
            <Text style={{ color: "#fff" }}>
              <ArrowDownOutlined /> Chiqimlar
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card style={{ ...cardStyle, background: "#ef4444" }}>
            <Title level={3} style={{ color: "#fff" }}>
              {stats.debts?.toLocaleString()}
            </Title>
            <Text style={{ color: "#fff" }}>Qarzlar</Text>
          </Card>
        </Col>
      </Row>

      {/* Second Row */}
      <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
        <Col xs={24} sm={12} md={6}>
          <Card style={{ ...cardStyle, background: "#3b82f6" }}>
            <Title level={3} style={{ color: "#fff" }}>
              {stats.contracts}
            </Title>
            <Text style={{ color: "#fff" }}>
              <FileTextOutlined /> Shartnomalar
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card style={{ ...cardStyle, background: "#22c55e" }}>
            <Title level={3} style={{ color: "#fff" }}>
              {stats.currentMonthIncome?.toLocaleString()}
            </Title>
            <Text style={{ color: "#fff" }}>
              <ArrowUpOutlined /> Augustdagi daromadlar
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card style={{ ...cardStyle, background: "#a855f7" }}>
            <Title level={3} style={{ color: "#fff" }}>
              {stats.currentMonthExpenses?.toLocaleString()}
            </Title>
            <Text style={{ color: "#fff" }}>
              <ArrowDownOutlined /> Augustdagi chiqimlar
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card style={{ ...cardStyle, background: "#a855f7" }}>
            <Title level={4} style={{ color: "#fff" }}>
              Daromadlar
            </Title>
            <Text style={{ color: "#fff" }}>
              {currentYear} - yil: {stats.yearlyIncome?.toLocaleString()} so‘m
              <br />
              {currentYear - 1} - yil: {stats.lastYearIncome?.toLocaleString()}{" "}
              so‘m
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col xs={24} lg={12}>
          <Card style={{ borderRadius: 10 }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tushum" fill="#22c55e" name="Tushum" />
                <Bar dataKey="chiqim" fill="#eab308" name="Chiqim" />
                <Bar dataKey="qarzdorlik" fill="#ef4444" name="Qarzdorlik" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card style={{ borderRadius: 10 }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="expected"
                  stroke="#3b82f6"
                  name="Kutilayotgan tushum"
                  dot
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
