import { Button, Card, Input, Space } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

import ClientTypeFormModal from "./ui/client-type-form-modal";
import ClientTypesTable from "./tables/client-types-table";
import { useState } from "react";
import { useUrlState } from "../../hooks/useUrlState";

export default function ClientType() {
  const {
    search,
    handleSearch,
    localSearch,
    setLocalSearch,
    filters,
  } = useUrlState();

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<{ id: number; name: string } | null>(
    null
  );

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
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onPressEnter={() => handleSearch(localSearch)}
            allowClear
          />
          <Button
            type="default"
            icon={<SearchOutlined />}
            onClick={() => handleSearch(localSearch)}
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
        filters={{ ...filters, name: search }}
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
