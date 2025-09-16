import { Button, Card, Input, Space } from "antd";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";

import ArrivedsFilterModal from "./ui/arriveds-filter-modal";
import ArrivedsPageTable from "./ui/arriveds-page-table";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Arriveds() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string>>({});
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
        }}
      >
        <Space>
          <Input.Search
            placeholder="Kod bo‘yicha qidirish"
            allowClear
            enterButton
            onSearch={(val) => {
              setSearch(val);
              setPage(1);
            }}
            style={{ maxWidth: 300 }}
          />
          <Button
            icon={<FilterOutlined />}
            onClick={() => setFilterModalOpen(!filterModalOpen)}
          >
            Filter
          </Button>
        </Space>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            navigate("/arrived/create");
          }}
        >
          Yangi kirim
        </Button>
      </Space>
      <ArrivedsFilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={(values) => {
          setFilters(values);
          setPage(1);
        }}
        initialValues={filters}
      />
      <ArrivedsPageTable
        page={page}
        setPage={setPage}
        search={search}
        filters={filters}
      />
    </Card>
  );
}
