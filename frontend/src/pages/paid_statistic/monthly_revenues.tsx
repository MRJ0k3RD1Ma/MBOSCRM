import { Card, DatePicker, Tabs, type TabsProps } from "antd";
import { TrendingUp } from "lucide-react";
import { formatMoney } from "../../hooks/format/format_money";
import { useGetAllClients } from "../../config/queries/clients/clients-querys";
import { StatCard } from "./ui/stat-card";
import dayjs from "dayjs";
import ClientsPaidTable from "./ui/clients_paid_table";
import SubscribePaidTable from "./ui/subscribe_paid_table";
import SalesPaidTable from "./ui/sales_paid_table";
import { useUrlState } from "../../hooks/useUrlState";
import { useState } from "react";

const { RangePicker } = DatePicker;

export default function MonthlyRevenues() {
  const { filters, handleFilterApply } = useUrlState();
  const [activeKey, setActiveKey] = useState("1");

  const dateFrom = filters.dateFrom || "";
  const dateTo = filters.dateTo || "";

  const { data: clients } = useGetAllClients({
    page: 1,
    limit: 10,
    fromDate: dateFrom || undefined,
    toDate: dateTo || undefined,
  });

  const statsCards = [
    {
      title: "Mijozlar daromadi",
      value: formatMoney(clients?.totals.price || 0),
      icon: <TrendingUp size={32} color="white" />,
      bgColor: "!bg-[#0EAF69]",
      tabKey: "1",
      cursor: true,
    },
    {
      title: "Obuna daromadi",
      value: formatMoney(clients?.totals.subscribe || 0),
      icon: <TrendingUp size={32} color="white" />,
      bgColor: "!bg-[#0EAF69]",
      tabKey: "2",
      cursor: true,
    },
    {
      title: "Sotuvlar daromadi",
      value: formatMoney(clients?.totals.device || 0),
      icon: <TrendingUp size={32} color="white" />,
      bgColor: "!bg-[#0EAF69]",
      tabKey: "3",
      cursor: true,
    },
    {
      title: "Xizmatlar daromadi",
      value: formatMoney(clients?.totals.service || 0),
      icon: <TrendingUp size={32} color="white" />,
      bgColor: "!bg-[#0EAF69]",
      tabKey: activeKey,
    },
  ];

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Mijozlar",
      children: <ClientsPaidTable fromDate={dateFrom} toDate={dateTo} />,
    },
    {
      key: "2",
      label: "Obuna",
      children: <SubscribePaidTable fromDate={dateFrom} toDate={dateTo} />,
    },
    {
      key: "3",
      label: "Sotuvlar",
      children: <SalesPaidTable fromDate={dateFrom} toDate={dateTo} />,
    },
  ];

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <RangePicker
          style={{ width: "100%" }}
          placeholder={["Boshlanish sanasi", "Tugash sanasi"]}
          format="YYYY-MM-DD"
          value={dateFrom && dateTo ? [dayjs(dateFrom), dayjs(dateTo)] : null}
          onChange={(_, [from, to]) => {
            handleFilterApply({ dateFrom: from, dateTo: to });
          }}
        />
      </div>
      <div className="flex justify-between mb-6 gap-4">
        {statsCards.map((card, index) => (
          <div
            key={index}
            role="button"
            tabIndex={0}
            className="w-full !cursor-pointer"
            onClick={() => setActiveKey(card.tabKey)}
            onKeyDown={(e) => e.key === "Enter" && setActiveKey(card.tabKey)}
          >
            <StatCard
              title={card.title}
              value={card.value}
              icon={card.icon}
              bgColor={card.bgColor}
              cursor={card.cursor}
            />
          </div>
        ))}
      </div>
      <Tabs activeKey={activeKey} onChange={setActiveKey} items={tabItems} />
    </Card>
  );
}
