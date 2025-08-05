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
import { useEffect, useState } from "react";
import { useGetAllProducts } from "../../config/queries/products/products-querys";
import {
  useDeleteSale,
  useGetSaleById,
} from "../../config/queries/sale/sale-querys";
import { useGetAllSaleProduct } from "../../config/queries/sale/sale-product-querys";
import { useGetAllClients } from "../../config/queries/clients/clients-querys";

const { Title } = Typography;

export default function Sale() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState<number | null>(null);

  useEffect(() => {
    if (id) setCurrentId(Number(id));
  }, [id]);

  const { data: sale, isLoading } = useGetSaleById(currentId ?? undefined);
  const { data: saleProducts } = useGetAllSaleProduct({
    saleId: currentId ?? undefined,
  });
  const { data: clients } = useGetAllClients();
  const { data: products } = useGetAllProducts();

  const deleteSale = useDeleteSale();
  const handleDelete = () => {
    if (!currentId) return;
    deleteSale.mutate(currentId, {
      onSuccess: () => {
        message.success("Savdo o‘chirildi");
        navigate("/sale");
      },
    });
  };

  const productColumns = [
    {
      title: "Mahsulot nomi",
      dataIndex: "productId",
      render: (id: number) =>
        products?.data?.find((p) => p.id === id)?.name || `ID: ${id}`,
    },
    { title: "Soni", dataIndex: "count" },
    { title: "Narxi", dataIndex: "price" },
    { title: "Jami narx", dataIndex: "priceCount" },
  ];

  return (
    <Card style={{ maxHeight: "800px", overflow: "auto" }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Title level={4}>Savdo tafsilotlari</Title>
        <Space>
          <Button onClick={() => navigate(`/sale/edit/${id}`)}>
            O‘zgartirish
          </Button>
          <Button danger onClick={handleDelete}>
            O‘chirish
          </Button>
        </Space>
      </Row>

      <Card
        title="Asosiy ma'lumotlar"
        bordered={false}
        loading={isLoading}
        className="w-full mb-4"
      >
        <Descriptions column={1} bordered size="middle" className="w-full">
          <Descriptions.Item label="Sana">
            {sale?.date ? dayjs(sale.date).format("YYYY-MM-DD") : "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Kod">{sale?.code}</Descriptions.Item>
          <Descriptions.Item label="Mijoz">
            {clients?.data?.find((c) => c.id === sale?.clientId)?.name ||
              `ID: ${sale?.clientId}`}
          </Descriptions.Item>
          <Descriptions.Item label="Umumiy narx">
            {sale?.price}
          </Descriptions.Item>
          <Descriptions.Item label="Naqd (To‘langan)">
            {sale?.credit}
          </Descriptions.Item>
          <Descriptions.Item label="Qarz">{sale?.dept}</Descriptions.Item>
          <Descriptions.Item label="Holati">{sale?.state}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card
        title="Sotilgan mahsulotlar"
        bordered={false}
        className="w-full"
        style={{ paddingBottom: 0 }}
      >
        <Table
          dataSource={saleProducts?.data || []}
          columns={productColumns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </Card>
  );
}
