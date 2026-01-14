import { Card, DatePicker, Tabs, type TabsProps } from "antd";
import PaidOtherMonthly from "./ui/paid_other_monthly";
import SupplierPaidTable from "./ui/supplier_paid_table";
import ServerPaidTable from "./ui/server_paid_table";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { StatCard } from "./ui/stat-card";
import { TrendingDown } from "lucide-react";
import { formatMoney } from "../../hooks/format/format_money";
import { useGetStatisticsOutcome } from "../../config/queries/statistics/statistics-querys";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export default function MonthlyExpenses() {
  const [searchParams] = useSearchParams();

  const [dateFrom, setDateFrom] = useState(searchParams.get("dateFrom") || "");
  const [dateTo, setDateTo] = useState(searchParams.get("dateTo") || "");

  const { data: statsData } = useGetStatisticsOutcome({
    fromDate: dateFrom,
    toDate: dateTo,
  });

  useEffect(() => {
    setDateFrom(searchParams.get("dateFrom") || "");
    setDateTo(searchParams.get("dateTo") || "");
  }, [searchParams]);

  const statsCards = [
    {
      title: "Yetkazuvchilar chiqimi",
      value: formatMoney(statsData?.paidSupplier || 0),
      icon: <TrendingDown size={32} color="white" />,
      bgColor: "!bg-[#F59E0B]",
    },
    {
      title: "Server chiqimlar",
      value: formatMoney(statsData?.paidServer || 0),
      icon: <TrendingDown size={32} color="white" />,
      bgColor: "!bg-[#F59E0B]",
    },
    {
      title: "Boshqa chiqimlar",
      value: formatMoney(statsData?.paidOther || 0),
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
        />
      ),
    },
    {
      key: "2",
      label: "Serverlar",
      children: <ServerPaidTable fromDate={dateFrom} toDate={dateTo} />,
    },
    {
      key: "3",
      label: "Boshqalar",
      children: <PaidOtherMonthly fromDate={dateFrom} toDate={dateTo} />,
    },
  ];

  return (
    <Card className="MonthlyRevenues">
      <div className="flex justify-between items-center mb-4">
        <RangePicker
          placeholder={["Boshlanish sanasi", "Tugash sanasi"]}
          style={{ width: "100%" }}
          format="YYYY-MM-DD"
          value={dateFrom && dateTo ? [dayjs(dateFrom), dayjs(dateTo)] : null}
          onChange={(dates, dateStrings) => {
            setDateFrom(dateStrings[0]);
            setDateTo(dateStrings[1]);
            console.log(dates);
          }}
        />
      </div>
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
