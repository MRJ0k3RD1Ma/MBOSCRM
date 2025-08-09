import { useState } from "react";
import {
  Button,
  Card,
  Dropdown,
  Form,
  Space,
  Table,
  Tooltip,
  type MenuProps,
} from "antd";
import { PlusOutlined, MoreOutlined, FilterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import PaidSupplierFormModal from "./ui/paid-supplier-form-modal";
import PaidSupplierFilterModal from "./ui/paid-supplier-filter-modal";
import {
  useCreatePaidSupplier,
  useDeletePaidSupplier,
  useGetAllPaidSuppliers,
  useUpdatePaidSupplier,
  type CreatePaidSupplierInput,
  type PaidSupplier,
} from "../../config/queries/supplier/paid-supplier-querys";
import { useGetAllSuppliers } from "../../config/queries/supplier/supplier-querys";
import { useGetAllPayments } from "../../config/queries/payment/payment-querys";
import { indexColumn } from "../../components/tables/indexColumn";

export default function PaidSuppliers() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PaidSupplier | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading } = useGetAllPaidSuppliers({
    page,
    limit,
    ...filters,
  });

  const { data: suppliersData } = useGetAllSuppliers({ page: 1, limit: 1000 });
  const { data: paymentsData } = useGetAllPayments({ page: 1, limit: 1000 });

  const createPaidSupplier = useCreatePaidSupplier();
  const updatePaidSupplier = useUpdatePaidSupplier();
  const deletePaidSupplier = useDeletePaidSupplier();

  const onSubmit = (values: CreatePaidSupplierInput) => {
    if (editing) {
      updatePaidSupplier.mutate({ id: editing.id, ...values });
    } else {
      createPaidSupplier.mutate(values);
    }
    setOpen(false);
    setEditing(null);
  };

  const handleEdit = (row: PaidSupplier) => {
    setEditing(row);
    form.setFieldsValue({
      ...row,
      paidDate: row.paidDate ? row.paidDate : undefined,
    });
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    deletePaidSupplier.mutate(id);
  };

  const columns = [
    indexColumn(page, limit),
    {
      title: "Ta'minotchi",
      dataIndex: "supplierId",
      render: (supplierId: number) =>
        suppliersData?.data.find((u) => u.id === supplierId)?.name || "–",
    },
    {
      title: "To‘lov miqdori",
      dataIndex: "price",
      render: (dept: number) =>
        dept ? dept.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "To‘langan sana",
      dataIndex: "paidDate",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "To‘lov turi",
      dataIndex: "paymentId",
      render: (paymentId: number) =>
        paymentsData?.data.find((u) => u.id === paymentId)?.name || "–",
    },
    {
      title: "Amallar",
      key: "actions",
      render: (_: any, row: PaidSupplier) => {
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
        <Button
          icon={<FilterOutlined />}
          onClick={() => setFilterModalOpen(!filterModalOpen)}
        >
          Filter
        </Button>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditing(null);
            form.resetFields();
            setOpen(true);
          }}
        >
          Yangi to‘lov
        </Button>
      </Space>

      <PaidSupplierFilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={(values) => {
          setFilters(values);
          setPage(1);
        }}
        initialValues={filters}
        suppliers={suppliersData?.data || []}
        payments={paymentsData?.data || []}
      />

      <Table
        columns={columns}
        dataSource={data?.data || []}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total,
          onChange: (page) => setPage(page),
        }}
      />

      <PaidSupplierFormModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSubmit={onSubmit}
        initialValues={editing || undefined}
        suppliers={suppliersData?.data || []}
        payments={paymentsData?.data || []}
        supplierId={null}
      />
    </Card>
  );
}
