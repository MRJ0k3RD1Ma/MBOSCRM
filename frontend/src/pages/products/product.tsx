import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Popconfirm, Spin, Tabs, type TabsProps } from "antd";
import { useState } from "react";
import {
  useDeleteProduct,
  useGetProductById,
  useUpdateProduct,
  type UpdateProductInput,
} from "../../config/queries/products/products-querys";
import ProductFormModal from "./ui/product-form-modal";
import ProductInfos from "./ui/product-infos";
import ProductPageSaleTable from "./table/product-page-sale-table";
import ProductPageArrivedTable from "./table/product-page-arrived-table";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = Number(id);
  const [editOpen, setEditOpen] = useState(false);

  const { data: product, isLoading } = useGetProductById(productId);

  const deleteProduct = useDeleteProduct();
  const updateProduct = useUpdateProduct();

  const handleDelete = () => {
    deleteProduct.mutate(productId, {
      onSuccess: () => {
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

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Sotuvlar",
      children: <ProductPageSaleTable productId={productId} />,
    },
    {
      key: "2",
      label: "Skladga kelganlar",
      children: <ProductPageArrivedTable productId={productId} />,
    },
  ];

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <ProductInfos product={product} />
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
