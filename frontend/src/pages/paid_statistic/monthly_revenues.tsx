import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ClientsPaidTable from "./ui/clients_paid_table";
import PaidOtherMonthly from "./ui/paid_other_monthly";
import { Tabs } from "antd";

export default function MonthlyRevenues() {
  const [searchParams] = useSearchParams();

  const [dateFrom, setDateFrom] = useState(searchParams.get("dateFrom") || "");
  const [dateTo, setDateTo] = useState(searchParams.get("dateTo") || "");

  useEffect(() => {
    setDateFrom(searchParams.get("dateFrom") || "");
    setDateTo(searchParams.get("dateTo") || "");
  }, [searchParams]);

  const tabItems = [
    {
      key: "1",
      label: "Mijozlar",
      children: (
        <ClientsPaidTable
          fromDate={dateFrom}
          toDate={dateTo}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
        />
      ),
    },
    {
      key: "2",
      label: "Boshqa",
      children: (
        <PaidOtherMonthly
          fromDate={dateFrom}
          toDate={dateTo}
          type="INCOME"
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
        />
      ),
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={tabItems} />
    </div>
  );
}
