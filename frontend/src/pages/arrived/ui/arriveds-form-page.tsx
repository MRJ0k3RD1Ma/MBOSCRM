import {
  Button,
  Card,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Table,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useGetAllSuppliers } from "../../../config/queries/supplier/supplier-querys";
import { useGetAllProducts } from "../../../config/queries/products/products-querys";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateArrived,
  useGetArrivedById,
  useUpdateArrived,
  type ArrivedProductInput,
} from "../../../config/queries/arrived/arrived-qureys";
import {
  useCreateArrivedProduct,
  useDeleteArrivedProduct,
  useGetAllArrivedProduct,
  useUpdateArrivedProduct,
} from "../../../config/queries/arrived/arrived-product-querys";

const { Title } = Typography;

export default function ArrivedFormPage() {
  const [form] = Form.useForm();
  const [drawerForm] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [products, setProducts] = useState<ArrivedProductInput[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const createArrived = useCreateArrived();
  const updateArrived = useUpdateArrived();
  const createArrivedProduct = useCreateArrivedProduct();
  const updateArrivedProduct = useUpdateArrivedProduct();
  const deleteArrivedProduct = useDeleteArrivedProduct();
  const { data: arrivedData } = useGetArrivedById(Number(id), isEdit);
  const { data: suppliers } = useGetAllSuppliers();
  const { data: productsList } = useGetAllProducts();
  const { data: arrivedProductsData } = useGetAllArrivedProduct({
    arrivedId: isEdit ? Number(id) : undefined,
  });

  const productDataSource = isEdit ? arrivedProductsData?.data || [] : products;

  useEffect(() => {
    if (arrivedData) {
      const patched = {
        ...arrivedData,
        date: dayjs(arrivedData.date),
      };
      form.setFieldsValue(patched);
    }
  }, [arrivedData]);

  const onFinish = async (values: any) => {
    const payload = {
      ...values,
      date: values.date.toISOString(),
      products,
    };

    if (isEdit) {
      updateArrived.mutate(
        { id: Number(id), ...payload },
        {
          onSuccess: () => {
            message.success("Kirim yangilandi");
            navigate("/arriveds");
          },
        }
      );
    } else {
      createArrived.mutate(payload, {
        onSuccess: () => {
          message.success("Yangi kirim qo‘shildi");
          navigate("/arriveds");
        },
      });
    }
  };

  const onDrawerFinish = async () => {
    try {
      const values: any = await drawerForm.validateFields();

      if (isEdit && values.id) {
        updateArrivedProduct.mutate({
          id: values.id,
          price: values.price,
          count: values.count,
        });
      } else if (isEdit && id) {
        createArrivedProduct.mutate({
          ...values,
          arrivedId: Number(id),
        });
      } else {
        setProducts((prev) => [...prev, { ...values }]);
      }

      drawerForm.resetFields();
      setDrawerOpen(false);
    } catch (err) {
      message.error("Mahsulot kiritishda xatolik yuz berdi");
    }
  };

  const columns = [
    {
      title: "Mahsulot",
      dataIndex: "productId",
      render: (id: number) =>
        productsList?.data.find((p) => p.id === id)?.name || "Noma'lum",
    },
    {
      title: "Soni",
      dataIndex: "count",
    },
    {
      title: "Narxi",
      dataIndex: "price",
    },
    {
      title: "Umumiy narxi",
      dataIndex: "priceCount",
    },
    {
      title: "Amallar",
      render: (_: any, record: any) => (
        <Space>
          <Button
            size="small"
            onClick={() => {
              drawerForm.setFieldsValue(record);
              setDrawerOpen(true);
            }}
          >
            Tahrirlash
          </Button>
          <Button
            danger
            size="small"
            onClick={() => {
              if (isEdit) {
                deleteArrivedProduct.mutate(record.id);
              } else {
                setProducts((prev) =>
                  prev.filter((item) => item.productId !== record.productId)
                );
              }
            }}
          >
            O‘chirish
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Title level={4}>
        {isEdit ? "Kirimni tahrirlash" : "Yangi kirim qo‘shish"}
      </Title>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="date" label="Sana" rules={[{ required: true }]}>
          <DatePicker format="YYYY-MM-DD" className="w-full" />
        </Form.Item>

        <Form.Item
          name="waybillNumber"
          label="Waybill raqami"
          rules={[{ required: true }]}
        >
          <Input placeholder="Waybill raqamini yozing" />
        </Form.Item>

        <Form.Item
          name="supplierId"
          label="Ta'minotchi"
          rules={[{ required: true }]}
        >
          <Select placeholder="Tanlang">
            {suppliers?.data.map((s) => (
              <Select.Option key={s.id} value={s.id}>
                {s.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="description" label="Izoh">
          <Input.TextArea rows={3} placeholder="Kirim haqidagi izohni yozing" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {isEdit ? "Yangilash" : "Saqlash"}
            </Button>
            <Button
              type="dashed"
              onClick={() => setDrawerOpen(true)}
              disabled={false}
            >
              Mahsulot qo‘shish
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <Table
        rowKey={(record: any) =>
          isEdit
            ? record.id
            : `${record.productId}-${record.price}-${record.count}`
        }
        dataSource={productDataSource}
        columns={columns}
        pagination={false}
      />

      <Drawer
        open={drawerOpen}
        title="Mahsulot qo‘shish"
        onClose={() => setDrawerOpen(false)}
        width={400}
        destroyOnClose
      >
        <Form layout="vertical" form={drawerForm} onFinish={onDrawerFinish}>
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="productId"
            label="Mahsulot"
            rules={[{ required: true, message: "Mahsulotni tanlang" }]}
          >
            <Select placeholder="Mahsulot tanlang">
              {productsList?.data.map((p) => (
                <Select.Option key={p.id} value={p.id}>
                  {p.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="count"
            label="Soni"
            rules={[{ required: true, message: "Soni kerak" }]}
          >
            <InputNumber
              min={1}
              className="!w-full"
              placeholder="Mahsulot sonini kiriting"
            />
          </Form.Item>

          <Form.Item
            name="price"
            label="Narxi"
            rules={[{ required: true, message: "Narxi kerak" }]}
          >
            <InputNumber
              min={0}
              className="!w-full"
              placeholder="Mahsulot narxini kiriting"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Qo‘shish
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </Card>
  );
}
