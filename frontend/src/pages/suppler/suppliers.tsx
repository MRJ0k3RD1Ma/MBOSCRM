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
  useCreateSupplier,
  useDeleteSupplier,
  useGetAllSuppliers,
  useUpdateSupplier,
  type CreateSupplierInput,
  type Supplier,
} from "../../config/queries/supplier/supplier-querys";
import SuppliersFilterModal from "./ui/suppliers-filter-modal";
import SuppliersFormModal from "./ui/suppliers-form-modal";
import { indexColumn } from "../../components/tables/indexColumn";

export default function Suppliers() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Supplier | null>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading } = useGetAllSuppliers({
    page,
    limit,
    ...(search ? { name: search } : {}),
    ...filters,
  });

  const createSupplier = useCreateSupplier();
  const updateSupplier = useUpdateSupplier();
  const deleteSupplier = useDeleteSupplier();

  const onSubmit = (values: CreateSupplierInput) => {
    if (editing) {
      updateSupplier.mutate({ id: editing.id, ...values });
    } else {
      createSupplier.mutate(values);
    }
    setOpen(false);
    setEditing(null);
  };

  const handleEdit = (supplier: Supplier) => {
    setEditing(supplier);
    form.setFieldsValue(supplier);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteSupplier.mutate(id);
  };

  const columns = [
    indexColumn(page, limit),
    { title: "Nomi", dataIndex: "name" },
    {
      title: "Telefon",
      dataIndex: "phone",
      render: (text: string) => (text ? text : "-"),
    },
    {
      title: "Qo‘shimcha telefon",
      dataIndex: "phoneTwo",
      render: (text: string) => (text ? text : "-"),
    },
    {
      title: "Izoh",
      dataIndex: "description",
      render: (text: string) => (text ? text : "-"),
    },
    {
      title: "Balans",
      dataIndex: "balance",
      render: (balance: number) =>
        balance ? balance.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "Amallar",
      key: "actions",
      render: (_: any, row: Supplier) => {
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
            label: "Tafsilotlar",
            onClick: () => navigate(`/supplier/${row.id}`),
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
            placeholder="Yetkazib beruvchi nomi bo‘yicha qidirish"
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
            setEditing(null);
            form.resetFields();
            setOpen(true);
          }}
        >
          Yangi yetkazib beruvchi
        </Button>
      </Space>
      <SuppliersFilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={(values) => {
          setFilters(values);
          setPage(1);
        }}
        initialValues={filters}
      />
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
            navigate(`/supplier/${record.id}`);
          },
        })}
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total,
          onChange: (page) => setPage(page),
        }}
      />

      <SuppliersFormModal
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
