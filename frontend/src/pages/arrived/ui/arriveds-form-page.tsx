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
import { useThemeContext } from "../../../providers/theme-provider";

const { Title } = Typography;

export default function ArrivedFormPage() {
  const [form] = Form.useForm();
  const [drawerForm] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const [products, setProducts] = useState<ArrivedProductInput[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const createArrived = useCreateArrived();
  const updateArrived = useUpdateArrived();
  const createArrivedProduct = useCreateArrivedProduct();
  const updateArrivedProduct = useUpdateArrivedProduct();
  const deleteArrivedProduct = useDeleteArrivedProduct();
  const { data: arrivedData } = useGetArrivedById(Number(id), isEdit);
  const { data: suppliers } = useGetAllSuppliers();
  const { data: productsList } = useGetAllProducts({
    type: "DEVICE",
  });
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
    } catch (err) {
      message.error("Mahsulot kiritishda xatolik yuz berdi");
    }
  };

  const columns = [
    {
      title: "№",
      dataIndex: "index",
      render: (_: any, __: any, index: number) => +index + 1,
    },
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
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "Umumiy narxi",
      dataIndex: "priceCount",
      render: (priceCount: number) =>
        priceCount ? priceCount.toLocaleString("uz-UZ") + " so'm" : "0",
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
      <div className="w-full flex justify-between items-center mb-4">
        <Title level={4}>
          {isEdit ? "Kirimni tahrirlash" : "Yangi kirim qo‘shish"}
        </Title>
        <div>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => form.submit()}
          >
            {isEdit ? "Yangilash" : "Saqlash"}
          </Button>
        </div>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="flex flex-wrap gap-4 w-full">
          <Form.Item
            name="date"
            label="Sana"
            rules={[{ required: true }]}
            style={{ flex: 1 }}
            className="min-w-[200px] grow !w-full"
          >
            <DatePicker
              className="w-full"
              placeholder="Sanani tanlang"
              format="YYYY-MM-DD"
            />
          </Form.Item>

          <Form.Item
            name="waybillNumber"
            label="Waybill raqami"
            rules={[{ required: true }]}
            style={{ flex: 1 }}
            className="min-w-[200px] grow !w-full"
          >
            <Input placeholder="Waybill raqamini yozing" className="w-full" />
          </Form.Item>

          <Form.Item
            name="supplierId"
            label="Ta'minotchi"
            rules={[{ required: true }]}
            style={{ flex: 1 }}
            className="min-w-[200px] grow !w-full"
          >
            <Select
              placeholder="Ta'minotchini tanlang"
              showSearch
              optionFilterProp="label"
              className="w-full"
            >
              {suppliers?.data.map((s) => (
                <Select.Option key={s.id} value={s.id} label={s.name}>
                  {s.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Izoh"
            style={{ flex: 2 }}
            className="min-w-[200px] grow !w-full"
          >
            <Input.TextArea
              rows={1}
              placeholder="Izoh yozing"
              className="w-full"
              autoSize={{ minRows: 1, maxRows: 1 }}
            />
          </Form.Item>
        </div>
      </Form>
      <Title level={4}>Mahsulotlar</Title>
      <Form form={drawerForm} onFinish={onDrawerFinish}>
        <div className="flex gap-4">
          <Form.Item
            name="productId"
            rules={[{ required: true }]}
            className="min-w-[200px] grow"
          >
            <Select
              placeholder="Mahsulot tanlang"
              showSearch
              optionFilterProp="label"
              allowClear
              onChange={(value) => {
                const selectedProduct = productsList?.data.find(
                  (p) => p.id === value
                );
                if (selectedProduct) {
                  drawerForm.setFieldsValue({
                    count: 1,
                    price: selectedProduct.price,
                    priceCount: selectedProduct.price * 1,
                  });
                } else {
                  drawerForm.setFieldsValue({
                    count: null,
                    price: null,
                    priceCount: 0,
                  });
                }
              }}
            >
              {productsList?.data.map((p) => (
                <Select.Option key={p.id} value={p.id} label={p.name}>
                  {p.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="count"
            rules={[{ required: true }]}
            className="min-w-[100px] max-w-[150px] grow"
          >
            <InputNumber
              min={1}
              className="!w-full"
              placeholder="Soni"
              onChange={(value: any) => {
                const price = drawerForm.getFieldValue("price") || 0;
                drawerForm.setFieldsValue({
                  priceCount: price * value,
                });
              }}
            />
          </Form.Item>

          <Form.Item
            name="price"
            rules={[{ required: true }]}
            className="min-w-[200px] grow"
          >
            <InputNumber
              min={0}
              className="!w-full"
              placeholder="Narxi"
              onChange={(value: any) => {
                const count = drawerForm.getFieldValue("count") || 0;
                drawerForm.setFieldsValue({
                  priceCount: count * value,
                });
              }}
            />
          </Form.Item>
          <Form.Item name="priceCount" className="min-w-[200px] grow">
            <InputNumber disabled className="!w-full" placeholder="Jami narx" />
          </Form.Item>
          <Form.Item style={{ flexShrink: 0 }}>
            <Button htmlType="submit" type="primary">
              +
            </Button>
          </Form.Item>
        </div>
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
        title="Mahsulot tahrirlash"
        onClose={() => {
          drawerForm.resetFields();
          setDrawerOpen(false);
        }}
        width={400}
        destroyOnClose
        bodyStyle={{
          background: isDark ? "#001529" : "#ffffff",
        }}
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
            <Select
              placeholder="Mahsulot tanlang"
              showSearch
              optionFilterProp="label"
            >
              {productsList?.data.map((p) => (
                <Select.Option key={p.id} value={p.id} label={p.name}>
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
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </Card>
  );
}
