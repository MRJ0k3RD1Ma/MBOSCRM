import { useState } from "react";
import { Button, Card, Form, Input, Space } from "antd";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import {
  useCreateProduct,
  useUpdateProduct,
  type CreateProductInput,
  type Product,
} from "../../config/queries/products/products-querys";
import ProductsFilterModal from "./ui/products-filter-modal";
import ProductsModal from "./ui/products-form-modal";
import ProductsPageTable from "./table/products-page-table";
import { useUrlState } from "../../hooks/useUrlState";

export default function ProductsPage() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const {
    page,
    search,
    localSearch,
    setLocalSearch,
    filters,
    setPage,
    handleSearch,
    handleFilterApply,
  } = useUrlState();

  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const onSubmit = (values: CreateProductInput) => {
    if (editing) {
      updateProduct.mutate({ id: editing.id, ...values });
    } else {
      createProduct.mutate(values);
    }
    setOpen(false);
    setEditing(null);
  };

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
            placeholder="Mahsulot nomi bo‘yicha qidirish"
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

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditing(null);
            form.resetFields();
            setOpen(true);
          }}
        >
          Yangi mahsulot qo‘shish
        </Button>
      </Space>
      <ProductsFilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={handleFilterApply}
        initialValues={filters}
        reminder={true}
      />
      <ProductsPageTable
        page={page}
        setPage={setPage}
        search={search}
        filters={filters}
        setEditing={setEditing}
        form={form}
        setOpen={setOpen}
      />

      <ProductsModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSubmit={onSubmit}
        initialValues={editing || undefined}
      />
    </Card>
  );
}
