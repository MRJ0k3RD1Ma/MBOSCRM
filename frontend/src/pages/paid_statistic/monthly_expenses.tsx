import { Tabs, type TabsProps } from "antd";
import PaidOtherMonthly from "./ui/paid_other_monthly";
import SupplierPaidTable from "./ui/supplier_paid_table";
import ServerPaidTable from "./ui/server_paid_table";

export default function MonthlyExpenses() {
  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Yetkazib beruvchilar to'lovlari",
      children: <SupplierPaidTable />,
    },
    {
      key: "2",
      label: "Boshqa to'lovlar",
      children: <PaidOtherMonthly type={"OUTCOME"} />,
    },
    {
      key: "3",
      label: "Server to'lovlari",
      children: <ServerPaidTable />,
    },
  ];

  return (
    <div className="MonthlyRevenues">
      <Tabs defaultActiveKey="1" items={tabItems} />
    </div>
  );
}
