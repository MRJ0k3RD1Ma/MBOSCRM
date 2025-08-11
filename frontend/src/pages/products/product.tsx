import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Descriptions,
  Button,
  Popconfirm,
  message,
  Spin,
  Tabs,
  Table,
  type TabsProps,
} from "antd";
import { useState } from "react";
import {
  useDeleteProduct,
  useGetProductById,
  useUpdateProduct,
  type UpdateProductInput,
} from "../../config/queries/products/products-querys";
import ProductFormModal from "./ui/product-form-modal";
import { useGetAllProductUnits } from "../../config/queries/products/product-unit-querys";
import { useGetAllProductGroups } from "../../config/queries/products/product-gorup-querys";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useGetAllSaleProduct } from "../../config/queries/sale/sale-product-querys";
import { useGetAllArrivedProduct } from "../../config/queries/arrived/arrived-product-querys";
import { indexColumn } from "../../components/tables/indexColumn";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = Number(id);

  // === Sotuvlar pagination state ===
  const [salesPage, setSalesPage] = useState(1);
  const [salesLimit, setSalesLimit] = useState(10);

  // === Kelganlar pagination state ===
  const [arrivalsPage, setArrivalsPage] = useState(1);
  const [arrivalsLimit, setArrivalsLimit] = useState(10);

  const { data: product, isLoading } = useGetProductById(productId);
  const { data: productUnitId } = useGetAllProductUnits();
  const { data: productGroupId } = useGetAllProductGroups();

  // API chaqiruvlar pagination bilan
  const { data: saleProductsClient, isLoading: salesLoading } =
    useGetAllSaleProduct({
      productId,
      page: salesPage,
      limit: salesLimit,
    });

  const { data: arrivedProducts, isLoading: arrivalsLoading } =
    useGetAllArrivedProduct({
      productId,
      page: arrivalsPage,
      limit: arrivalsLimit,
    });

  const deleteProduct = useDeleteProduct();
  const updateProduct = useUpdateProduct();

  const [editOpen, setEditOpen] = useState(false);

  const handleDelete = () => {
    deleteProduct.mutate(productId, {
      onSuccess: () => {
        message.success("Mahsulot o‘chirildi");
        navigate("/products");
      },
    });
  };

  const handleUpdate = (values: Omit<UpdateProductInput, "id">) => {
    updateProduct.mutate({ ...values, id: productId });
    setEditOpen(false);
  };

  if (isLoading || !product) {
    return <Spin size="large" />;
  }

  dayjs.extend(utc);
  dayjs.extend(timezone);

  const salesColumns = [
    indexColumn(salesPage, salesLimit),
    { title: "Shartnoma raqami", dataIndex: ["sale", "code"] },
    {
      title: "Sana",
      dataIndex: "createdAt",
      render: (text: string) =>
        text ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD") : "—",
    },
    {
      title: "Narxi",
      dataIndex: "price",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
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
      title: "Umumiy narxi ",
      dataIndex: "priceCount",
      render: (priceCount: number) =>
        priceCount ? priceCount.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "Obunami",
      dataIndex: ["SaleProduct", "0", "is_subscribe"],
      render: (is_subscribe: boolean) => (is_subscribe ? "Ha" : "Yo'q"),
    },
    { title: "Kiritdi", dataIndex: ["register", "name"] },
  ];

  const arrivalsColumns = [
    indexColumn(arrivalsPage, arrivalsLimit),
    { title: "Shartnoma raqami", dataIndex: ["Arrived", "code"] },
    {
      title: "Sana",
      dataIndex: "createdAt",
      render: (text: string) =>
        text ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD") : "—",
    },
    {
      title: "Narxi",
      dataIndex: "price",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "Soni",
      dataIndex: "count",
      render: (_: any, record: any) => {
        const count = record.count || 0;
        const unitName = record.Product?.ProductUnit?.name || "-";
        return `${count} ${unitName}`;
      },
    },
    {
      title: "Umumiy narxi ",
      dataIndex: "priceCount",
      render: (priceCount: number) =>
        priceCount ? priceCount.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    { title: "Kiritdi", dataIndex: ["register", "name"] },
  ];

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Sotuvlar",
      children: (
        <Table
          loading={salesLoading}
          columns={salesColumns}
          dataSource={saleProductsClient?.data}
          rowKey="id"
          pagination={{
            current: salesPage,
            pageSize: salesLimit,
            total: saleProductsClient?.total || 0,
            onChange: (p, ps) => {
              setSalesPage(p);
              setSalesLimit(ps);
            },
          }}
        />
      ),
    },
    {
      key: "2",
      label: "Skladga kelganlar",
      children: (
        <Table
          loading={arrivalsLoading}
          columns={arrivalsColumns}
          dataSource={arrivedProducts?.data}
          rowKey="id"
          pagination={{
            current: arrivalsPage,
            pageSize: arrivalsLimit,
            total: arrivedProducts?.total || 0,
            onChange: (p, ps) => {
              setArrivalsPage(p);
              setArrivalsLimit(ps);
            },
          }}
        />
      ),
    },
  ];

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <Card
        style={{ flex: 1, maxWidth: 480 }}
        title="Mahsulot haqida ma’lumotlar"
      >
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="ID">{product.id || "-"}</Descriptions.Item>
          <Descriptions.Item label="Nomi">
            {product.name || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Shtrix kod">
            {product.barcode || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Guruh">
            {productGroupId?.data.find((p) => p.id === product.groupId)?.name ||
              "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Birligi">
            {productUnitId?.data.find((p) => p.id === product.unitId)?.name ||
              "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Kelish narxi">
            {product.priceIncome || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Sotish narxi">
            {product.price || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Skladdagi qoldiq va birligi">
            {product.countReminder}{" "}
            {productUnitId?.data.find((p) => p.id === product.unitId)?.name ||
              "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Umumiy sotilgan soni">
            {product.countSale || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Umumiy kelgan soni">
            {product.countArrived || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Turi">
            {product.type || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Yaratilgan">
            {product.createdAt
              ? dayjs(product.createdAt)
                  .tz("Asia/Tashkent")
                  .format("YYYY-MM-DD")
              : "Noma'lum"}
          </Descriptions.Item>
          <Descriptions.Item label="O'zgartirilgan">
            {product.updatedAt
              ? dayjs(product.updatedAt)
                  .tz("Asia/Tashkent")
                  .format("YYYY-MM-DD")
              : "Noma'lum"}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card
        style={{ flex: 2 }}
        title="Mahsulotning qo‘shimcha ma’lumotlari"
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

      <ProductFormModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSubmit={handleUpdate}
        initialValues={product}
      />
    </div>
  );
}
