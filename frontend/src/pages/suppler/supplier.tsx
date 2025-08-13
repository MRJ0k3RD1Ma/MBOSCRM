import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Descriptions,
  Button,
  Popconfirm,
  message,
  Spin,
  Tabs,
  type TabsProps,
  Table,
  Space,
} from "antd";
import { useState } from "react";
import {
  useDeleteSupplier,
  useGetAllSuppliers,
  useGetSupplierById,
  useUpdateSupplier,
  type CreateSupplierInput,
} from "../../config/queries/supplier/supplier-querys";
import SupplierFormModal from "./ui/supplier-form-modal";
import dayjs from "dayjs";
import { useGetAllArrived } from "../../config/queries/arrived/arrived-qureys";
import {
  useCreatePaidSupplier,
  useGetAllPaidSuppliers,
  type CreatePaidSupplierInput,
} from "../../config/queries/supplier/paid-supplier-querys";
import { PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import PaidSupplierFormModal from "./ui/paid-supplier-form-modal";
import { useGetAllPayments } from "../../config/queries/payment/payment-querys";
import { indexColumn } from "../../components/tables/indexColumn";

export default function Supplier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const supplierId = Number(id);
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const limit = 5;
  const { data: supplier, isLoading } = useGetSupplierById(supplierId);
  const { data: arrivedSupplierID, isLoading: isArrivalsLoading } =
    useGetAllArrived({
      supplierId,
      page: page1,
      limit,
    });
  const { data: SupplierPaidID, isLoading: isPaidLoading } =
    useGetAllPaidSuppliers({
      supplierId,
      page: page2,
      limit,
    });

  const { data: suppliersData } = useGetAllSuppliers({ page: 1, limit: 1000 });
  const { data: paymentsData } = useGetAllPayments({ page: 1, limit: 1000 });

  const createPaidSupplier = useCreatePaidSupplier();
  const deleteSupplier = useDeleteSupplier();
  const updateSupplier = useUpdateSupplier();

  const [editOpen, setEditOpen] = useState(false);
  const [paidOpen, setPaidOpen] = useState(false);

  const onSubmit = (values: CreatePaidSupplierInput) => {
    createPaidSupplier.mutate(values);
    setPaidOpen(false);
  };

  const handleDelete = () => {
    deleteSupplier.mutate(supplierId, {
      onSuccess: () => {
        message.success("Yetkazib beruvchi o‘chirildi");
        navigate("/supplier");
      },
    });
  };

  const handleUpdate = (values: CreateSupplierInput) => {
    updateSupplier.mutate({ id: supplierId, ...values });
    setEditOpen(false);
  };

  if (isLoading || !supplier) {
    return <Spin size="large" />;
  }

  const salesColumns = [
    indexColumn(page1, limit),
    { title: "Kirim code", dataIndex: "code" },
    {
      title: "Sana",
      dataIndex: "date",
      render: (text: string) =>
        text ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD") : "—",
    },
    {
      title: "Umumiy narxi",
      dataIndex: "price",
      render: (priceCount: number) =>
        priceCount ? priceCount.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "Kiritdi",
      dataIndex: ["register", "name"],
    },
  ];

  const arrivalsColumns = [
    indexColumn(page2, limit),
    {
      title: "To'lov sanasi",
      dataIndex: "paidDate",
      render: (text: string) =>
        text ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD") : "—",
    },
    { title: "To'lov turi", dataIndex: ["Payment", "name"] },
    {
      title: "Umumiy narxi",
      dataIndex: "price",
      render: (priceCount: number) =>
        priceCount ? priceCount.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "Kiritdi",
      dataIndex: ["register", "name"],
    },
  ];
  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Kelgan mahsulotlar",
      children: (
        <Table
          columns={salesColumns}
          dataSource={arrivedSupplierID?.data}
          loading={isArrivalsLoading}
          pagination={{
            current: page1,
            pageSize: limit,
            total: arrivedSupplierID?.total,
            onChange: setPage1,
          }}
          rowKey="id"
        />
      ),
    },
    {
      key: "2",
      label: "To'lovlar",
      children: (
        <Table
          columns={arrivalsColumns}
          dataSource={SupplierPaidID?.data}
          loading={isPaidLoading}
          pagination={{
            current: page2,
            pageSize: limit,
            total: SupplierPaidID?.total,
            onChange: setPage2,
          }}
          rowKey="id"
        />
      ),
    },
  ];
  console.log(supplier);

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <Card style={{ flex: 1, maxWidth: 480 }}>
        <Space direction="vertical" className="mb-4">
          <Title className="!text-[17px]">
            Yetkazib beruvchi: {supplier.name}
          </Title>
          <Space>
            <Button
              onClick={() => setEditOpen(true)}
              style={{ marginRight: 8 }}
            >
              O‘zgartirish
            </Button>
            <Popconfirm
              title="Haqiqatan o‘chirmoqchimisiz?"
              onConfirm={handleDelete}
            >
              <Button danger>O‘chirish</Button>
            </Popconfirm>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setPaidOpen(true);
              }}
            >
              Yangi to‘lov qo‘shish
            </Button>
          </Space>
        </Space>
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="ID">{supplier.id}</Descriptions.Item>
          <Descriptions.Item label="Nomi">{supplier.name}</Descriptions.Item>
          <Descriptions.Item label="Telefon">
            {supplier.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Qo‘shimcha telefon">
            {supplier.phoneTwo || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Izoh">
            {supplier.description || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Balans">
            {supplier.balance ?? 0}
          </Descriptions.Item>
          <Descriptions.Item label="Kiritdi">
            {supplier.register?.name || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Yaratildi">
            {supplier.createdAt
              ? dayjs(supplier.createdAt)
                  .tz("Asia/Tashkent")
                  .format("YYYY-MM-DD")
              : "Noma'lum"}
          </Descriptions.Item>
          <Descriptions.Item label="O’zgartirildi">
            {supplier.updatedAt
              ? dayjs(supplier.updatedAt)
                  .tz("Asia/Tashkent")
                  .format("YYYY-MM-DD")
              : "Noma'lum"}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card
        style={{ flex: 2 }}
        title="Yetkazib beruvchi qo‘shimcha ma’lumotlari"
      >
        <Tabs defaultActiveKey="1" items={tabItems} />
      </Card>
      <PaidSupplierFormModal
        open={paidOpen}
        onClose={() => {
          setPaidOpen(false);
        }}
        onSubmit={onSubmit}
        suppliers={suppliersData?.data || []}
        payments={paymentsData?.data || []}
        supplierId={supplierId}
      />

      <SupplierFormModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSubmit={handleUpdate}
        initialValues={supplier}
      />
    </div>
  );
}
