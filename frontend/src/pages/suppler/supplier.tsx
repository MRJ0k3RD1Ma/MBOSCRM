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
} from "antd";
import { useState } from "react";
import {
  useDeleteSupplier,
  useGetSupplierById,
  useUpdateSupplier,
  type CreateSupplierInput,
} from "../../config/queries/supplier/supplier-querys";
import SupplierFormModal from "./ui/supplier-form-modal";
import dayjs from "dayjs";
import { useGetAllArrived } from "../../config/queries/arrived/arrived-qureys";
import { useGetAllPaidSuppliers } from "../../config/queries/supplier/paid-supplier-querys";

export default function Supplier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const supplierId = Number(id);

  const { data: supplier, isLoading } = useGetSupplierById(supplierId);
  const { data: arrivedSupplierID } = useGetAllArrived({ supplierId });
  const { data: SupplierPaidID } = useGetAllPaidSuppliers({ supplierId });

  const deleteSupplier = useDeleteSupplier();
  const updateSupplier = useUpdateSupplier();

  const [editOpen, setEditOpen] = useState(false);

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
    { title: "Kirim code", dataIndex: "code" },
    {
      title: "Sana",
      dataIndex: "date",
      render: (text: string) =>
        text
          ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD HH:mm:ss")
          : "—",
    },
    // {
    //   title: "Narxi",
    //   dataIndex: ["ArrivedProduct", "0", "price"],
    //   render: (price: number) =>
    //     price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    // },
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
    {
      title: "To'lov sanasi",
      dataIndex: "paidDate",
      render: (text: string) =>
        text
          ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD HH:mm:ss")
          : "—",
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

  const dummyData = Array(8)
    .fill(0)
    .map((_, i) => ({
      key: i,
      checkNumber: "Lorem",
      date: "Lorem",
      price: "Lorem",
      quantity: "Lorem",
      total: "Lorem",
      subscriber: "Lorem",
      registerId: "Lorem",
      supplier: "Lorem",
    }));

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Kirim ma'lumotlari",
      children: (
        <Table
          columns={salesColumns}
          dataSource={arrivedSupplierID?.data}
          pagination={false}
        />
      ),
    },
    {
      key: "2",
      label: "Kirim tolov ma'lumotlari",
      children: (
        <Table
          columns={arrivalsColumns}
          dataSource={SupplierPaidID?.data}
          pagination={false}
        />
      ),
    },
  ];
  console.log(supplier);

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <Card
        style={{ flex: 1, maxWidth: 480 }}
        title={`Yetkazib beruvchi: ${supplier.name}`}
      >
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="ID">{supplier.id}</Descriptions.Item>
          <Descriptions.Item label="Nomi">{supplier.name}</Descriptions.Item>
          <Descriptions.Item label="Telefon">
            {supplier.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Qo‘shimcha telefon">
            {supplier.phoneTwo || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Izoh">
            {supplier.description || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Balans">
            {supplier.balance ?? 0}
          </Descriptions.Item>
          <Descriptions.Item label="Kiritdi">
            {supplier.register?.name || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="O’zgartirildi">
            {supplier.updatedAt
              ? dayjs(supplier.updatedAt)
                  .tz("Asia/Tashkent")
                  .format("YYYY-MM-DD HH:mm:ss")
              : "Noma'lum"}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card
        style={{ flex: 2 }}
        title="Yetkazib beruvchi qo‘shimcha ma’lumotlari"
        extra={
          <>
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
          </>
        }
      >
        <Tabs defaultActiveKey="1" items={tabItems} />
      </Card>
      <SupplierFormModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSubmit={handleUpdate}
        initialValues={supplier}
      />
    </div>
  );
}
