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
import { useEffect, useState } from "react";
import { useGetAllProducts } from "../../config/queries/products/products-querys";
import {
  useDeleteSale,
  useGetAllSale,
  useGetSaleById,
} from "../../config/queries/sale/sale-querys";
import { useGetAllSaleProduct } from "../../config/queries/sale/sale-product-querys";
import { useGetAllClients } from "../../config/queries/clients/clients-querys";
import { useGetAllClientTypes } from "../../config/queries/clients/client-type-querys";
import { PlusOutlined } from "@ant-design/icons";
import PaidClientFormModal from "../clients/ui/paid-clients-form-modal";
import { useGetAllPayments } from "../../config/queries/payment/payment-querys";
import {
  useCreatePaidClient,
  type PaidClientDto,
} from "../../config/queries/clients/paid-client-querys";

const { Title } = Typography;

export default function Sale() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paidOpen, setPaidOpen] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);

  useEffect(() => {
    if (id) setCurrentId(Number(id));
  }, [id]);

  const { data: sale, isLoading } = useGetSaleById(currentId ?? undefined);
  const { data: saleProducts } = useGetAllSaleProduct({
    saleId: currentId ?? undefined,
  });
  const { data: sales } = useGetAllSale({ page: 1, limit: 1000 });
  const { data: payments } = useGetAllPayments({ page: 1, limit: 1000 });
  const { data: clients } = useGetAllClients();
  const { data: products } = useGetAllProducts();
  const { data: types } = useGetAllClientTypes();

  const createPaidClient = useCreatePaidClient();
  const deleteSale = useDeleteSale();

  const onSubmit = (values: PaidClientDto) => {
    createPaidClient.mutate(values);
    setPaidOpen(false);
  };

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
    {
      title: "Soni",
      dataIndex: "count",
      render: (_: any, record: any) => {
        const count = record.count || 0;
        const unitName = record.product?.ProductUnit?.name || "-";
        return `${count} ${unitName}`;
      },
    },
    {
      title: "Narxi",
      dataIndex: "price",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "Jami narx",
      dataIndex: "priceCount",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
  ];

  return (
    <Card style={{ width: "100%", maxHeight: "800px", overflow: "auto" }}>
      <Row
        justify="space-between"
        align="middle"
        style={{
          marginBottom: 24,
          borderBottom: "1px solid #303030",
          paddingBottom: "20px",
        }}
      >
        <Title level={4}>Savdo tafsilotlari</Title>
        <Space>
          <Button onClick={() => navigate(`/sale/edit/${id}`)}>
            O‘zgartirish
          </Button>
          <Button danger onClick={handleDelete}>
            O‘chirish
          </Button>
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
      </Row>

      <Card bordered={false} loading={isLoading} className="!w-full mb-4">
        <Row gutter={16}>
          <Col span={12}>
            <Descriptions
              bordered
              column={1}
              size="small"
              title="Sotuv ma'lumotlari"
            >
              <Descriptions.Item label="Sana">
                {sale?.date ? dayjs(sale.date).format("YYYY-MM-DD") : "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Kod">
                {sale?.code ?? "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Mijoz">
                {clients?.data?.find((c) => c.id === sale?.clientId)?.name ||
                  (sale?.clientId ? `ID: ${sale.clientId}` : "-")}
              </Descriptions.Item>
              <Descriptions.Item label="Umumiy narx">
                {sale?.price != null
                  ? sale.price.toLocaleString("uz-UZ") + " so'm"
                  : "0"}
              </Descriptions.Item>
              <Descriptions.Item label="Naqd (To‘langan)">
                {sale?.credit != null
                  ? sale.credit.toLocaleString("uz-UZ") + " so'm"
                  : "0"}
              </Descriptions.Item>
              <Descriptions.Item label="Qarz">
                {sale?.dept != null
                  ? sale.dept.toLocaleString("uz-UZ") + " so'm"
                  : "0"}
              </Descriptions.Item>
              <Descriptions.Item label="Holati">
                {sale?.state ?? "-"}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={12}>
            <Descriptions
              bordered
              column={1}
              size="small"
              title="Mijoz ma'lumotlari"
            >
              <Descriptions.Item label="Ismi">
                {sale?.client?.name ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="INN">
                {sale?.client?.inn ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Telefon">
                {sale?.client?.phone ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Balans">
                {sale?.client?.balance != null
                  ? sale.client.balance.toLocaleString("uz-UZ") + " so'm"
                  : "0"}
              </Descriptions.Item>
              <Descriptions.Item label="Manzil">
                {sale?.client?.address ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Viloyat">
                {sale?.client?.Region?.name ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Tuman">
                {sale?.client?.District?.name ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Tavsif">
                {sale?.client?.description ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Mijoz turi">
                {types?.data?.find((t) => t.id === sale?.client?.typeId)
                  ?.name ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Yaratilgan">
                {sale?.client?.createdAt
                  ? dayjs(sale.client.createdAt)
                      .tz("Asia/Tashkent")
                      .format("YYYY-MM-DD HH:mm:ss")
                  : "Noma'lum"}
              </Descriptions.Item>
              <Descriptions.Item label="O'zgartirilgan">
                {sale?.client?.updatedAt
                  ? dayjs(sale.client.updatedAt)
                      .tz("Asia/Tashkent")
                      .format("YYYY-MM-DD HH:mm:ss")
                  : "Noma'lum"}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>
      <PaidClientFormModal
        open={paidOpen}
        onClose={() => {
          setPaidOpen(false);
        }}
        onSubmit={onSubmit}
        clients={clients?.data || []}
        sales={sales?.data || []}
        payments={payments?.data || []}
        clientId={Number(sale?.client?.id)}
      />
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
