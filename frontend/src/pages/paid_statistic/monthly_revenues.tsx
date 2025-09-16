import { Tabs, type TabsProps } from "antd";
import ClientsPaidTable from "./ui/clients_paid_table";
import PaidOtherMonthly from "./ui/paid_other_monthly";

export default function MonthlyRevenues() {
  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Moijozlar to'lovlari",
      children: <ClientsPaidTable />,
    },
    {
      key: "2",
      label: "Boshqa to'lovlar",
      children: <PaidOtherMonthly type={"INCOME"} />,
    },
  ];

  return (
    <div className="MonthlyRevenues">
      <Tabs defaultActiveKey="1" items={tabItems} />
    </div>
  );
}
