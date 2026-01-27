import { Card, DatePicker, Tabs, type TabsProps } from "antd";
import { TrendingDown } from "lucide-react";
import { formatMoney } from "../../hooks/format/format_money";
import { useGetAllClients } from "../../config/queries/clients/clients-querys";
import { StatCard } from "./ui/stat-card";
import dayjs from "dayjs";
import ClientsCreditTable from "./ui/clients_credit_table";
import SubscribeCreditTable from "./ui/subscribe_credit_table";
import SalesCreditTable from "./ui/sales_credit_table";
import { useUrlState } from "../../hooks/useUrlState";
import { useState } from "react";

const { RangePicker } = DatePicker;

export default function MonthlyCredit() {
  const [activeKey, setActiveKey] = useState("1");

  const { filters, handleFilterApply } = useUrlState();

  const dateFrom = filters.dateFrom || "";
  const dateTo = filters.dateTo || "";

  const { data: clients } = useGetAllClients({
    page: 1,
    limit: 1,
    fromDate: dateFrom || undefined,
    toDate: dateTo || undefined,
    ...filters,
    isPositiveBalance: false,
  });

  const statsCards = [
    {
      title: "Mijozlar qarzdorligi",
      value: formatMoney(clients?.totals.credit || 0),
      icon: <TrendingDown size={32} color="white" />,
      bgColor: "!bg-[#EF4444]",
      tabKey: "1",
      cursor: true,
    },
    {
      title: "Obuna qarzdorligi",
      value: formatMoney(clients?.totals.subscribeCredit || 0),
      icon: <TrendingDown size={32} color="white" />,
      bgColor: "!bg-[#EF4444]",
      tabKey: "2",
      cursor: true,
    },
    {
      title: "Sotuv qarzdorligi",
      value: formatMoney(clients?.totals.saleCredit || 0),
      icon: <TrendingDown size={32} color="white" />,
      bgColor: "!bg-[#EF4444]",
      tabKey: "3",
      cursor: true,
    },
    {
      title: "Bu Oy qarzdorligi",
      value: formatMoney(clients?.totals.monthCredit || 0),
      icon: <TrendingDown size={32} color="white" />,
      bgColor: "!bg-[#EF4444]",
      tabKey: activeKey,
    },
  ];

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Mijozlar",
      children: <ClientsCreditTable fromDate={dateFrom} toDate={dateTo} />,
    },
    {
      key: "2",
      label: "Obuna",
      children: <SubscribeCreditTable fromDate={dateFrom} toDate={dateTo} />,
    },
    {
      key: "3",
      label: "Sotuvlar",
      children: <SalesCreditTable fromDate={dateFrom} toDate={dateTo} />,
    },
  ];

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <RangePicker
          style={{ width: "100%" }}
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
            className="w-full cursor-pointer"
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
