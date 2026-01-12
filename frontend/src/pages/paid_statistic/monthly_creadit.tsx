import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Tabs } from "antd";
import SubscribePaidTable from "./ui/subscribe_paid_table";
import SalesPaidTable from "./ui/sales_paid_table";
import ClientsCreditTable from "./ui/clients_credit_table";
import SupplierCreditTable from "./ui/supplier_credit_table";

export default function MonthlyCredit() {
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
      label: "Obunalar",
      children: (
        <SubscribePaidTable
          fromDate={dateFrom}
          toDate={dateTo}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
        />
      ),
    },
    {
      key: "2",
      label: "Sotuvlar",
      children: (
        <SalesPaidTable
          fromDate={dateFrom}
          toDate={dateTo}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
        />
      ),
    },
    {
      key: "3",
      label: "Mijozlar",
      children: (
        <ClientsCreditTable
          fromDate={dateFrom}
          toDate={dateTo}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
        />
      ),
    },
    {
      key: "4",
      label: "Yetkazib beruvchilar",
      children: (
        <SupplierCreditTable
          fromDate={dateFrom}
          toDate={dateTo}
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
