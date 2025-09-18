import { Card, Input, Space } from "antd";

import SmsTable from "./ui/sms-table";
import { useState } from "react";

export default function Sms() {
  const [search, setSearch] = useState("");
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
      >
        <Space>
          <Input.Search
            placeholder="Xabar bo‘yicha qidirish"
            allowClear
            enterButton
            onSearch={(val) => {
              setSearch(val);
              setPage(1);
            }}
            style={{ maxWidth: 300 }}
          />
        </Space>
      </Space>

      <SmsTable search={search} page={page} setPage={setPage} />
    </Card>
  );
}
