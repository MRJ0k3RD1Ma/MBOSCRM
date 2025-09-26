import { Card, Space } from "antd";

import AppealsTable from "./ui/appeals-table";
import { useState } from "react";

export default function Appeals() {
  const [page, setPage] = useState(1);

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
