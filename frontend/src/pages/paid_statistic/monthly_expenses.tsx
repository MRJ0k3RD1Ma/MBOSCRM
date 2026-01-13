import { Card, Tabs, type TabsProps } from "antd";
import PaidOtherMonthly from "./ui/paid_other_monthly";
import SupplierPaidTable from "./ui/supplier_paid_table";
import ServerPaidTable from "./ui/server_paid_table";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { StatCard } from "./ui/stat-card";
import { TrendingDown } from "lucide-react";
import { formatMoney } from "../../hooks/format/format_money";

export default function MonthlyExpenses() {
  const [searchParams] = useSearchParams();

  const [dateFrom, setDateFrom] = useState(searchParams.get("dateFrom") || "");
  const [dateTo, setDateTo] = useState(searchParams.get("dateTo") || "");

  const [statsValue, setStatsValue] = useState({
    totalSupplierPaid: 0,
    totalOtherPaid: 0,
    totalServerPaid: 0,
  });

  useEffect(() => {
    setDateFrom(searchParams.get("dateFrom") || "");
    setDateTo(searchParams.get("dateTo") || "");
  }, [searchParams]);

  const statsCards = [
    {
      title: "Yetkazuvchilar chiqimi",
      value: formatMoney(statsValue.totalSupplierPaid || 0),
      icon: <TrendingDown size={32} color="white" />,
      bgColor: "!bg-[#F59E0B]",
    },
    {
      title: "Server chiqimlar",
      value: formatMoney(statsValue.totalServerPaid || 0),
      icon: <TrendingDown size={32} color="white" />,
      bgColor: "!bg-[#F59E0B]",
    },
    {
      title: "Boshqa chiqimlar",
      value: formatMoney(statsValue.totalOtherPaid || 0),
      icon: <TrendingDown size={32} color="white" />,
      bgColor: "!bg-[#F59E0B]",
    },
  ];

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Yetkazib beruvchilar",
      children: (
        <SupplierPaidTable
          fromDate={dateFrom}
          toDate={dateTo}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
          statsValue={statsValue}
          setStatsValue={setStatsValue}
        />
      ),
    },
    {
      key: "2",
      label: "Serverlar",
      children: (
        <ServerPaidTable
          fromDate={dateFrom}
          toDate={dateTo}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
          statsValue={statsValue}
          setStatsValue={setStatsValue}
        />
      ),
    },
    {
      key: "3",
      label: "Boshqalar",
      children: (
        <PaidOtherMonthly
          fromDate={dateFrom}
          toDate={dateTo}
          type={"OUTCOME"}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
          statsValue={statsValue}
          setStatsValue={setStatsValue}
        />
      ),
    },
  ];

  return (
    <Card className="MonthlyRevenues">
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
      <Tabs defaultActiveKey="1" items={tabItems} />
    </Card>
  );
}
