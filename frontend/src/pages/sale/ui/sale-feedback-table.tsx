import { Table } from "antd";
import dayjs from "dayjs";
import { indexColumn } from "../../../components/tables/indexColumn";

export default function SaleFeedbackTable({
  saleFeedback,
}: {
  saleFeedback: any;
}) {
  const limit = 5;

  const saleFeedbackColumns = [
    indexColumn(1, limit),
    {
      title: "Holati",
      dataIndex: "state",
    },
    {
      title: "Qabul qilgan shaxs",
      dataIndex: "name",
    },
    {
      title: "Bajarilgan ish natijasi",
      dataIndex: "result",
    },
    {
      title: "Baho",
      dataIndex: "score",
    },
    {
      title: "Sana",
      dataIndex: "createdAt",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "izoh",
      dataIndex: "description",
    },
  ];

  return (
    <div className="sale-feedback-table">
      <Table
        dataSource={saleFeedback?.data || []}
        columns={saleFeedbackColumns}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
}
