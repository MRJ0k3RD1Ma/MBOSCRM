import { DatePicker, Table } from "antd";
import dayjs from "dayjs";
import { indexColumn } from "../../../components/tables/indexColumn";
import timezone from "dayjs/plugin/timezone";
import { useGetAllSuppliers } from "../../../config/queries/supplier/supplier-querys";
import { useEffect, useState } from "react";
import utc from "dayjs/plugin/utc";

const { RangePicker } = DatePicker;

dayjs.extend(utc);
dayjs.extend(timezone);

export default function ({
  fromDate,
  toDate,
  setDateFrom,
  setDateTo,
  statsValue,
  setStatsValue,
}: {
  fromDate: string;
  toDate: string;
  setDateFrom: (date: string) => void;
  setDateTo: (date: string) => void;
  statsValue: {
    totalSupplierPaid: number;
    totalOtherPaid: number;
    totalServerPaid: number;
  };
  setStatsValue: (stats: {
    totalSupplierPaid: number;
    totalOtherPaid: number;
    totalServerPaid: number;
  }) => void;
}) {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data, isLoading } = useGetAllSuppliers({
    page,
    limit,
    fromDate,
    toDate,
  });

  useEffect(() => {
    if (data) {
      setStatsValue({
        ...statsValue,
        totalSupplierPaid: data.price || 0,
      });
    }
  }, [data]);
  const columns = [
    indexColumn(page, limit),
    {
      title: "Yetkazuvchi",
      dataIndex: ["register", "name"],
    },
    { title: "Telefon raqami", dataIndex: "phone" },
    {
      title: "Yetkazuvchilarga to‘langan jami",
      dataIndex: "totalPrice",
      render: (dept: number) =>
        dept ? dept.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "Umumiy to‘lov",
      dataIndex: "totalPrice",
      render: (dept: number) =>
        dept ? dept.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "Balansi",
      dataIndex: "balance",
      sortName: "totalBalance",
      sorter: true,
      render: (v: number) =>
        v ? v.toLocaleString("uz-UZ") + " so'm" : "0 so'm",
    },
  ];

  return (
    <div className="ClientsPaidTable">
      <div className="flex justify-between items-center mb-4">
        <RangePicker
          placeholder={["Boshlanish sanasi", "Tugash sanasi"]}
          style={{ width: "100%" }}
          format="YYYY-MM-DD"
          value={fromDate && toDate ? [dayjs(fromDate), dayjs(toDate)] : null}
          onChange={(dates, dateStrings) => {
            setDateFrom(dateStrings[0]);
            setDateTo(dateStrings[1]);
            console.log(dates);
          }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={data?.data || []}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total || 0,
          onChange: (page) => setPage(page),
        }}
      />
    </div>
  );
}
