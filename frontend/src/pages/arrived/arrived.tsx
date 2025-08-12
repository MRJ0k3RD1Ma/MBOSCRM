import {
  Button,
  Card,
  Col,
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
import { indexColumn } from "../../components/tables/indexColumn";

const { Title } = Typography;

export default function Arrived() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [currentId, setCurrentId] = useState<number | null>(null);

  useEffect(() => {
    if (id) setCurrentId(Number(id));
  }, [id]);

  const { data: arrived, isLoading } = useGetArrivedById(
    currentId ?? undefined
  );

  const { data: suppliers } = useGetAllSuppliers();
  const { data: productsList } = useGetAllProducts();
  const { data: arrivedProducts } = useGetAllArrivedProduct({
    page,
    limit: 5,
    arrivedId: currentId ?? undefined,
  });
  const supplier = suppliers?.data?.find((p) => p.id === arrived?.supplierId);
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
    indexColumn(page, 5),
    {
      title: "Mahsulot nomi",
      dataIndex: "productId",
      render: (id: number) =>
        productsList?.data?.find((p) => p.id === id)?.name || `ID: ${id}`,
    },
    { title: "Soni", dataIndex: "count" },
    {
      title: "Narxi",
      dataIndex: "price",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "Jami narx",
      dataIndex: "priceCount",
      render: (priceCount: number) =>
        priceCount ? priceCount.toLocaleString("uz-UZ") + " so'm" : "0",
    },
  ];

  return (
    <Card>
      <Row
        justify="space-between"
        align="middle"
        style={{
          marginBottom: 24,
          borderBottom: "1px solid #303030",
          paddingBottom: "20px",
        }}
      >
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

      <Card bordered={false} loading={isLoading} className="!w-full mb-4">
        <Row gutter={16}>
          <Col span={12}>
            <Descriptions
              bordered
              column={1}
              size="small"
              title="Qabul qilingan mahsulotlar ma'lumotlari"
            >
              <Descriptions.Item label="Sana">
                {arrived?.date ? dayjs(arrived.date).format("YYYY-MM-DD") : "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Kod">{arrived?.code}</Descriptions.Item>
              <Descriptions.Item label="Nakladnoy">
                {arrived?.waybillNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Ta'minotchi">
                {suppliers?.data?.find((p) => p.id === arrived?.supplierId)
                  ?.name || `ID: ${arrived?.supplierId}`}
              </Descriptions.Item>
              <Descriptions.Item label="Izoh">
                {arrived?.description}
              </Descriptions.Item>
              <Descriptions.Item label="Umumiy narx">
                {arrived?.price
                  ? arrived?.price.toLocaleString("uz-UZ") + " so'm"
                  : "0"}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={12}>
            <Descriptions
              bordered
              column={1}
              size="small"
              title="Yetkazuvchi ma'lumotlari"
            >
              <Descriptions.Item label="ID">
                {supplier?.id || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Nomi">
                {supplier?.name || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Telefon">
                {supplier?.phone || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Qo‘shimcha telefon">
                {supplier?.phoneTwo || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Izoh">
                {supplier?.description || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Balans">
                {supplier?.balance ?? 0}
              </Descriptions.Item>
              <Descriptions.Item label="Kiritdi">
                {supplier?.register?.name || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Yaratildi">
                {supplier?.createdAt
                  ? dayjs(supplier.createdAt)
                      .tz("Asia/Tashkent")
                      .format("YYYY-MM-DD")
                  : "Noma'lum"}
              </Descriptions.Item>
              <Descriptions.Item label="O’zgartirildi">
                {supplier?.updatedAt
                  ? dayjs(supplier.updatedAt)
                      .tz("Asia/Tashkent")
                      .format("YYYY-MM-DD")
                  : "Noma'lum"}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
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
          pagination={{
            current: page,
            pageSize: 5,
            total: arrivedProducts?.total,
            onChange: setPage,
          }}
        />
      </Card>
    </Card>
  );
}
