import { Button, Card, Input, Space } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

import ProductGroupFormModal from "./ui/product-group-form-modal";
import ProductGroupTable from "./table/product-group-table";
import { useState } from "react";

export default function ProductGroup() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<any>({ name: "", page: 1, limit: 10 });

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<{ id: number; name: string } | null>(
    null
  );

  const handleSearch = () => {
    setFilters((prev: any) => ({ ...prev, name: search, page: 1 }));
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
            placeholder="Guruh nomi bo‘yicha qidirish"
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
      <ProductGroupTable
        filters={filters}
        setFilters={setFilters}
        setSelected={setSelected}
        setModalOpen={setModalOpen}
      />
      <ProductGroupFormModal
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
