import { useNavigate, useParams } from "react-router-dom";
import { Card, Descriptions, Button, Popconfirm, message, Spin } from "antd";
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

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = Number(id);

  const { data: product, isLoading } = useGetProductById(productId);
  const { data: productUnitId } = useGetAllProductUnits();
  const { data: productGroupId } = useGetAllProductGroups();

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

  return (
    <Card
      title={`Mahsulot: ${product.name}`}
      extra={
        <>
          <Button onClick={() => setEditOpen(true)} style={{ marginRight: 8 }}>
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
      <Descriptions bordered column={1} size="middle">
        <Descriptions.Item label="Nomi">{product.name}</Descriptions.Item>
        <Descriptions.Item label="Shtrix kod">
          {product.barcode}
        </Descriptions.Item>
        <Descriptions.Item label="Product guruh">
          {productGroupId?.data.find((p) => p.id === product.groupId)?.name ||
            "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Product birligi">
          {productUnitId?.data.find((p) => p.id === product.unitId)?.name ||
            "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Kirim narxi">
          {product.priceIncome}
        </Descriptions.Item>
        <Descriptions.Item label="Boshlang‘ich qoldiq">
          {product.reminderFirst}
        </Descriptions.Item>
        <Descriptions.Item label="Narxi">{product.price}</Descriptions.Item>
        <Descriptions.Item label="Turi">{product.type}</Descriptions.Item>
        <Descriptions.Item label="Joriy qoldiq">
          {product.countReminder}
        </Descriptions.Item>
        <Descriptions.Item label="Kirim soni">
          {product.countArrived}
        </Descriptions.Item>
        <Descriptions.Item label="Sotuv soni">
          {product.countSale}
        </Descriptions.Item>
        <Descriptions.Item label="Yaratilgan sana">
          {product.createdAt
            ? dayjs(product.createdAt)
                .tz("Asia/Tashkent")
                .format("YYYY-MM-DD HH:mm:ss")
            : "Noma'lum"}
        </Descriptions.Item>
      </Descriptions>

      <ProductFormModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSubmit={handleUpdate}
        initialValues={product}
      />
    </Card>
  );
}
