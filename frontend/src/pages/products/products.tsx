import { useState } from "react";
import {
  Button,
  Card,
  Dropdown,
  Form,
  Input,
  Space,
  Table,
  Tooltip,
  type MenuProps,
} from "antd";
import { PlusOutlined, MoreOutlined, FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  useCreateProduct,
  useDeleteProduct,
  useGetAllProducts,
  useUpdateProduct,
  type CreateProductInput,
  type Product,
} from "../../config/queries/products/products-querys";
import ProductsFilterModal from "./ui/products-filter-modal";
import ProductsModal from "./ui/products-form-modal";
import { useGetAllProductUnits } from "../../config/queries/products/product-unit-querys";
import { useGetAllProductGroups } from "../../config/queries/products/product-gorup-querys";

export default function ProductsPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading } = useGetAllProducts({
    page,
    limit,
    ...(search ? { name: search } : {}),
    ...filters,
  });

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const { data: unitsData } = useGetAllProductUnits();
  const { data: groupData } = useGetAllProductGroups();

  const onSubmit = (values: CreateProductInput) => {
    if (editing) {
      updateProduct.mutate({ id: editing.id, ...values });
    } else {
      createProduct.mutate(values);
    }
    setOpen(false);
    setEditing(null);
  };

  const handleEdit = (product: Product) => {
    setEditing(product);
    form.setFieldsValue(product);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteProduct.mutate(id);
  };

  const columns = [
    { title: "Nomi", dataIndex: "name", key: "name" },
    { title: "Shtrix kodi", dataIndex: "barcode", key: "barcode" },
    { title: "Shtrix ID", dataIndex: "barcodeId", key: "barcodeId" },
    { title: "Guruh ID", dataIndex: "groupId", key: "groupId" },
    { title: "Birlik ID", dataIndex: "unitId", key: "unitId" },
    { title: "Kelgan narx", dataIndex: "priceIncome", key: "priceIncome" },
    {
      title: "Dastlabki qoldiq",
      dataIndex: "reminderFirst",
      key: "reminderFirst",
    },
    { title: "Sotuv narxi", dataIndex: "price", key: "price" },
    { title: "Turi", dataIndex: "type", key: "type" },
    { title: "Qoldiq", dataIndex: "countReminder", key: "countReminder" },
    { title: "Kelgan soni", dataIndex: "countArrived", key: "countArrived" },
    { title: "Sotilgan soni", dataIndex: "countSale", key: "countSale" },
    {
      title: "Amallar",
      key: "actions",
      render: (_: any, row: Product) => {
        const items: MenuProps["items"] = [
          {
            key: "edit",
            label: "Tahrirlash",
            onClick: () => handleEdit(row),
          },
          {
            key: "delete",
            label: "O‘chirish",
            danger: true,
            onClick: () => handleDelete(row.id),
          },
          {
            key: "view",
            label: "Profilga o‘tish",
            onClick: () => navigate(`/product/${row.id}`),
          },
        ];

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Tooltip title="Boshqarish">
                <Button icon={<MoreOutlined />} />
              </Tooltip>
            </Dropdown>
          </div>
        );
      },
    },
  ];

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
            onSearch={(val) => {
              setSearch(val);
              setPage(1);
            }}
            style={{ maxWidth: 300 }}
          />
          <Button
            icon={<FilterOutlined />}
            onClick={() => setFilterModalOpen(true)}
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

      <Table
        columns={columns}
        dataSource={data?.data || []}
        loading={isLoading}
        rowKey="id"
        onRow={(record) => ({
          onClick: (e) => {
            if (
              (e.target as HTMLElement).closest("button") ||
              (e.target as HTMLElement).closest("svg")
            ) {
              return;
            }
            navigate(`/product/${record.id}`);
          },
        })}
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total,
          onChange: (page) => setPage(page),
        }}
      />

      <ProductsModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSubmit={onSubmit}
        initialValues={editing || undefined}
        units={unitsData?.data || []}
        group={groupData?.data || []}
      />

      <ProductsFilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={(values) => {
          setFilters(values);
          setPage(1);
        }}
        initialValues={filters}
      />
    </Card>
  );
}
