import { Button, Card, Input, Space } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

import ClientTypeFormModal from "./ui/client-type-form-modal";
import ClientTypesTable from "./tables/client-types-table";
import { useState } from "react";

export default function ClientType() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ name: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<{ id: number; name: string } | null>(
    null
  );

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, name: search, page: 1 }));
  };

  return (
    <Card>
      <Space
        style={{
          width: "100%",
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Space.Compact style={{ maxWidth: 400 }}>
          <Input
            placeholder="Tur nomi bo‘yicha qidirish"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onPressEnter={handleSearch}
            allowClear
          />
          <Button
            type="default"
            icon={<SearchOutlined />}
            onClick={handleSearch}
          />
        </Space.Compact>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setSelected(null);
            setModalOpen(true);
          }}
        >
          Yangi qo‘shish
        </Button>
      </Space>
      <ClientTypesTable
        search={search}
        filters={filters}
        setSelected={setSelected}
        setModalOpen={setModalOpen}
      />
      <ClientTypeFormModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelected(null);
        }}
        selected={selected}
      />
    </Card>
  );
}
