import { Table } from "antd";
import { indexColumn } from "../../../components/tables/indexColumn";
import { useState } from "react";
import { useGetAllSimCards } from "../../../config/queries/simcard/simcard-querys";
import dayjs from "dayjs";

export default function ClientSimCardTable({ clientId }: { clientId: number }) {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data: SimCardData } = useGetAllSimCards({
    clientId,
    page: page,
    limit,
  });

  const columns = [
    indexColumn(page, limit),
    { title: "Kompaniya", dataIndex: "company", key: "company" },
    { title: "Raqami", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Izoh", dataIndex: "description", key: "description" },
    {
      title: "Aktiv qilingan sana",
      dataIndex: "activeDate",
      key: "activeDate",
      render: (text: string) => (text ? dayjs(text).format("YYYY-MM-DD") : "—"),
    },
    {
      title: "Holati",
      dataIndex: "isActive",
      key: "isActive",
      render: (val: boolean) => (
        <span
          style={{
            padding: "2px 8px",
            borderRadius: 6,
            fontWeight: 500,
            backgroundColor: val ? "#4CAF50" : "#F44336",
            color: "#ffffff",
          }}
        >
          {val ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={SimCardData?.data}
      rowKey="id"
      pagination={{
        current: page,
        pageSize: limit,
        total: SimCardData?.total,
        onChange: (p) => setPage(p),
      }}
    />
  );
}
