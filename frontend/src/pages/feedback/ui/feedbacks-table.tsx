import { Table, Tag } from "antd";

import dayjs from "dayjs";
import { indexColumn } from "../../../components/tables/indexColumn";
import { useGetAllSaleFeedback } from "../../../config/queries/sale/sale-feedback-querys";

export default function FeedbacksTable({
  stateLabels,
  page,
  setPage,
  activeKey,
}: {
  stateLabels: Record<string, string>;
  page: number;
  setPage: (page: number) => void;
  activeKey: string;
}) {
  const limit = 10;
  const queryParams = activeKey === "ALL" ? {} : { state: activeKey };
  const { data, isLoading } = useGetAllSaleFeedback({
    ...queryParams,
    page,
    limit,
  });
  const columns = [
    indexColumn(page, limit),
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "izoh", dataIndex: "description", key: "description" },
    { title: "Ball", dataIndex: "score", key: "score" },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      render: (state: string) => {
        let color = "default";
        if (state === "TODO") color = "blue";
        if (state === "RUNNING") color = "orange";
        if (state === "WAITING") color = "purple";
        if (state === "COMPLETED") color = "green";
        if (state === "REJECTED") color = "red";
        return <Tag color={color}>{stateLabels[state]}</Tag>;
      },
    },
    { title: "Natija", dataIndex: "result", key: "result" },
    {
      title: "Sana",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
  ];
  return (
    <div className="feedbacks-table">
      <Table
        rowKey="id"
        loading={isLoading}
        dataSource={data?.data || []}
        columns={columns}
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total || data?.data?.length || 0,
          onChange: setPage,
        }}
      />
    </div>
  );
}
