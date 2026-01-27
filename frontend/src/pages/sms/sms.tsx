import { Card, Input, Space } from "antd";

import SmsTable from "./ui/sms-table";
import { useUrlState } from "../../hooks/useUrlState";

export default function Sms() {
  const {
    page,
    setPage,
    search,
    handleSearch,
    localSearch,
    setLocalSearch,
  } = useUrlState();

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
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onSearch={handleSearch}
            style={{ maxWidth: 300 }}
          />
        </Space>
      </Space>

      <SmsTable search={search} page={page} setPage={setPage} />
    </Card>
  );
}
