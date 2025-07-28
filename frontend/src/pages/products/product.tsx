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

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = Number(id);

  const { data: product, isLoading } = useGetProductById(productId);
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
    // id ni alohida pass qilamiz va values ichida yana bo'lishiga yo‘l qo‘ymaymiz
    updateProduct.mutate({ ...values, id: productId });
    setEditOpen(false);
  };

  if (isLoading || !product) {
    return <Spin size="large" />;
  }

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
        <Descriptions.Item label="Barcode ID">
          {product.barcodeId}
        </Descriptions.Item>
        <Descriptions.Item label="Guruh ID">
          {product.groupId}
        </Descriptions.Item>
        <Descriptions.Item label="O‘lchov ID">
          {product.unitId}
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
            ? new Date(product.createdAt).toLocaleString()
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
