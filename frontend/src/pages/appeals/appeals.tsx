import { Card, Space } from "antd";

import AppealsTable from "./ui/appeals-table";
import { useUrlState } from "../../hooks/useUrlState";

export default function Appeals() {
  const { page, setPage } = useUrlState();

  return (
    <Card>
      <Space
        direction="horizontal"
        style={{
          width: "100%",
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      ></Space>

      <AppealsTable page={page} setPage={setPage} />
    </Card>
  );
}
