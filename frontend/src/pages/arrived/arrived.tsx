import {
  Button,
  Card,
  Descriptions,
  Row,
  Space,
  Table,
  Typography,
  message,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import {
  useDeleteArrived,
  useGetArrivedById,
} from "../../config/queries/arrived/arrived-qureys";
import { useGetAllArrivedProduct } from "../../config/queries/arrived/arrived-product-querys";
import { useEffect, useState } from "react";
import { useGetAllSuppliers } from "../../config/queries/supplier/supplier-querys";
import { useGetAllProducts } from "../../config/queries/products/products-querys";

const { Title } = Typography;

export default function Arrived() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState<number | null>(null);

  useEffect(() => {
    if (id) setCurrentId(Number(id));
  }, [id]);

  const { data: arrived, isLoading } = useGetArrivedById(
    currentId ?? undefined
  );
  const { data: suppliers } = useGetAllSuppliers();
  const { data: productsList } = useGetAllProducts();
  const { data: arrivedProducts } = useGetAllArrivedProduct();

  const deleteArrived = useDeleteArrived();
  const handleDelete = () => {
    if (!currentId) return;
    deleteArrived.mutate(currentId, {
      onSuccess: () => {
        message.success("Kirim o‘chirildi");
        navigate("/arrived");
      },
    });
  };

  const productColumns = [
    {
      title: "Mahsulot nomi",
      dataIndex: "productId",
      render: (id: number) =>
        productsList?.data?.find((p) => p.id === id)?.name || `ID: ${id}`,
    },
    { title: "Soni", dataIndex: "count" },
    { title: "Narxi", dataIndex: "price" },
    { title: "Jami narx", dataIndex: "priceCount" },
  ];

  return (
    <Card
      style={{
        maxHeight: "800px",
        overflow: "auto",
      }}
    >
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Title level={4}>Kirim tafsilotlari</Title>
        <Space>
          <Button onClick={() => navigate(`/arrived/edit/${id}`)}>
            O‘zgartirish
          </Button>
          <Button danger onClick={handleDelete}>
            O‘chirish
          </Button>
        </Space>
      </Row>

      {/* Asosiy ma'lumotlar */}
      <Card
        title="Asosiy ma'lumotlar"
        bordered={false}
        loading={isLoading}
        className="w-full mb-4"
      >
        <Descriptions column={1} bordered size="middle" className="w-full">
          <Descriptions.Item label="Sana">
            {arrived?.date ? dayjs(arrived.date).format("YYYY-MM-DD") : "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Kod">{arrived?.code}</Descriptions.Item>
          <Descriptions.Item label="Waybill">
            {arrived?.waybillNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Ta'minotchi">
            {suppliers?.data?.find((p) => p.id === arrived?.supplierId)?.name ||
              `ID: ${arrived?.supplierId}`}
          </Descriptions.Item>
          <Descriptions.Item label="Izoh">
            {arrived?.description}
          </Descriptions.Item>
          <Descriptions.Item label="Umumiy narx">
            {arrived?.price}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card
        title="Mahsulotlar ro'yxati"
        bordered={false}
        className="w-full"
        style={{ paddingBottom: 0 }}
      >
        <Table
          dataSource={
            arrivedProducts?.data?.filter((p) => p.arrivedId === currentId) ||
            []
          }
          columns={productColumns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </Card>
  );
}
