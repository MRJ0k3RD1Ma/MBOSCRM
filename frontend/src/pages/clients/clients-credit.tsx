import { Button, Card, Input, Space } from "antd";

import ClientsCreditTable from "./tables/clients-credit-table";
import ClientsFilterModal from "./ui/clients-filter-modal";
import { FilterOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useUrlState } from "../../hooks/useUrlState";

export default function ClientsCredit() {
  const {
    page,
    setPage,
    search,
    handleSearch,
    localSearch,
    setLocalSearch,
    filters,
    handleFilterApply,
  } = useUrlState();

  const [filterModalOpen, setFilterModalOpen] = useState(false);

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
            placeholder="Mijoz nomi bo‘yicha qidirish"
            allowClear
            enterButton
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onSearch={handleSearch}
            style={{ maxWidth: 300 }}
          />
          <Button
            icon={<FilterOutlined />}
            onClick={() => setFilterModalOpen(!filterModalOpen)}
          >
            Filter
          </Button>
        </Space>
      </Space>
      <ClientsFilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={handleFilterApply}
        initialValues={filters}
      />
      <ClientsCreditTable
        page={page}
        setPage={setPage}
        search={search}
        filters={filters}
      />
    </Card>
  );
}
