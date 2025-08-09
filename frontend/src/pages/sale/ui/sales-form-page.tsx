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
import { useNavigate, useParams } from "react-router-dom";
import { useThemeContext } from "../../../providers/theme-provider";
import { useGetAllClients } from "../../../config/queries/clients/clients-querys";
import { useGetAllProducts } from "../../../config/queries/products/products-querys";
import {
  useCreateSale,
  useGetSaleById,
  useUpdateSale,
} from "../../../config/queries/sale/sale-querys";
import {
  useCreateSaleProduct,
  useDeleteSaleProduct,
  useGetAllSaleProduct,
  useUpdateSaleProduct,
} from "../../../config/queries/sale/sale-product-querys";

const { Title } = Typography;

export default function SalesFormPage() {
  const [form] = Form.useForm();
  const [drawerForm] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const [products, setProducts] = useState<any[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedProductCountReminder, setSelectedProductCountReminder] =
    useState<number | null>(null);

  const { data: clients } = useGetAllClients();
  const { data: productsList } = useGetAllProducts();
  const { data: saleData } = useGetSaleById(Number(id), isEdit);
  const { data: saleProductsData } = useGetAllSaleProduct({
    saleId: isEdit ? Number(id) : undefined,
  });
  const createSale = useCreateSale();
  const updateSale = useUpdateSale();
  const createSaleProduct = useCreateSaleProduct();
  const updateSaleProduct = useUpdateSaleProduct();
  const deleteSaleProduct = useDeleteSaleProduct();

  const productDataSource = isEdit ? saleProductsData?.data || [] : products;

  useEffect(() => {
    if (saleData) {
      form.setFieldsValue({
        ...saleData,
        date: dayjs(saleData.date),
      });
    }
  }, [saleData]);

  const onFinish = async (values: any) => {
    const payload = {
      ...values,
      date: values.date.toISOString(),
      products,
    };

    if (isEdit) {
      updateSale.mutate(
        { id: Number(id), ...payload },
        {
          onSuccess: () => {
            message.success("Sotuv yangilandi");
            navigate("/sales");
          },
        }
      );
    } else {
      createSale.mutate(payload, {
        onSuccess: () => {
          message.success("Yangi sotuv qo‘shildi");
          navigate("/sales");
        },
      });
    }
  };

  const onDrawerFinish = async () => {
    try {
      const values: any = await drawerForm.validateFields();

      if (isEdit && values.id) {
        updateSaleProduct.mutate({
          id: values.id,
          count: values.count,
          price: values.price,
        });
      } else if (isEdit && id) {
        createSaleProduct.mutate({
          ...values,
          saleId: Number(id),
        });
      } else {
        if (values.id) {
          setProducts((prev) =>
            prev.map((p) =>
              p.productId === values.productId ? { ...p, ...values } : p
            )
          );
        } else {
          setProducts((prev) => [...prev, { ...values }]);
        }
      }

      drawerForm.resetFields();
      setSelectedProductCountReminder(null); // tozalash
      setDrawerOpen(false);
    } catch (error) {
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
          {isEdit && (
            <Button
              size="small"
              onClick={() => {
                drawerForm.setFieldsValue(record);
                const prod = productsList?.data.find(
                  (p: any) => p.id === record.productId
                ) as any;
                setSelectedProductCountReminder(
                  prod?.countReminder ?? record?.countReminder ?? null
                );
                setDrawerOpen(true);
              }}
            >
              Tahrirlash
            </Button>
          )}
          <Button
            danger
            size="small"
            onClick={() => {
              if (isEdit) {
                deleteSaleProduct.mutate(record.id);
              } else {
                setProducts((prev) =>
                  prev.filter((p) => p.productId !== record.productId)
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
        <Title level={4}>{isEdit ? "Sotuvni tahrirlash" : "Yangi sotuv"}</Title>
        <Button type="primary" onClick={() => form.submit()}>
          {isEdit ? "Yangilash" : "Saqlash"}
        </Button>
      </div>

      <Form layout="vertical" form={form} onFinish={onFinish}>
        <div className="!w-full flex justify-between gap-4">
          <Form.Item
            name="clientId"
            label="Mijoz"
            rules={[{ required: true }]}
            className="min-w-[200px] grow"
          >
            <Select
              placeholder="Mijozni tanlang"
              showSearch
              optionFilterProp="label"
              className="w-full"
            >
              {clients?.data.map((c) => (
                <Select.Option key={c.id} value={c.id} label={c.name}>
                  {c.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="date"
            label="Yaratilish sanasi"
            rules={[{ required: true }]}
            className="min-w-[200px] grow"
          >
            <DatePicker className="w-full" format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="subscribe_begin_date"
            label="Obuna boshlanish sanasi"
            rules={[{ required: true }]}
            className="min-w-[200px] grow"
          >
            <DatePicker className="w-full" format="YYYY-MM-DD" />
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
                  (p: any) => p.id === value
                ) as any;
                if (selectedProduct) {
                  drawerForm.setFieldsValue({
                    count: 1,
                    price: selectedProduct.price,
                    priceCount: selectedProduct.price * 1,
                  });
                  setSelectedProductCountReminder(
                    selectedProduct.countReminder ?? null
                  );
                } else {
                  drawerForm.setFieldsValue({
                    count: null,
                    price: null,
                    priceCount: 0,
                  });
                  setSelectedProductCountReminder(null);
                }
              }}
            >
              {productsList?.data.map((p: any) => (
                <Select.Option key={p.id} value={p.id} label={p.name}>
                  {p.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            shouldUpdate={(prev, curr) => prev.productId !== curr.productId}
            noStyle
          >
            {({ getFieldValue, setFieldsValue }) => {
              const selectedProduct = productsList?.data.find(
                (p) => p.id === getFieldValue("productId")
              );

              const countReminder: number = selectedProduct?.countReminder ?? 0;

              if (selectedProduct) {
                if (countReminder > 0) {
                  setFieldsValue({ count: 1 });
                } else {
                  setFieldsValue({ count: null });
                }
              }

              return (
                <div className="flex flex-col -mt-[30px]">
                  <div
                    style={{
                      marginBottom: 8,
                      color:
                        selectedProduct?.countReminder === 0 ? "red" : "gray",
                    }}
                  >
                    {selectedProduct
                      ? `Qolgan soni: ${countReminder}`
                      : "Mahsulot tanlang"}
                  </div>

                  <Form.Item
                    name="count"
                    rules={[
                      { required: true, message: "Soni kiriting" },
                      {
                        validator: (_, value) => {
                          if (!selectedProduct) return Promise.resolve();
                          if (value > countReminder) {
                            return Promise.reject(
                              new Error("Mahsulot yetarli emas")
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                    className="min-w-[100px] max-w-[150px] grow"
                  >
                    <InputNumber
                      min={1}
                      className="!w-full"
                      placeholder="Soni"
                      disabled={!selectedProduct || countReminder === 0}
                      onChange={(value: any) => {
                        const price = getFieldValue("price") || 0;
                        setFieldsValue({
                          priceCount: price * (value || 0),
                        });
                      }}
                    />
                  </Form.Item>
                </div>
              );
            }}
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
        rowKey={(r) => (isEdit ? r.id : `${r.productId}-${r.count}-${r.price}`)}
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
          setSelectedProductCountReminder(null);
        }}
        width={400}
        destroyOnClose
        bodyStyle={{ background: isDark ? "#001529" : "#fff" }}
      >
        <Form layout="vertical" form={drawerForm} onFinish={onDrawerFinish}>
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            name="productId"
            label="Mahsulot"
            rules={[{ required: true }]}
          >
            <Select placeholder="Tanlang" showSearch optionFilterProp="label">
              {productsList?.data.map((p: any) => (
                <Select.Option key={p.id} value={p.id} label={p.name}>
                  {p.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="count"
            label={
              selectedProductCountReminder !== null
                ? `Soni (qolgan: ${selectedProductCountReminder})`
                : "Soni"
            }
            rules={[
              { required: true, message: "Soni kiritilishi shart" },
              () => ({
                validator(_, value) {
                  if (
                    selectedProductCountReminder !== null &&
                    value > selectedProductCountReminder
                  ) {
                    return Promise.reject(
                      new Error(
                        `Maksimal miqdor: ${selectedProductCountReminder}`
                      )
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
            className="min-w-[200px] grow"
          >
            <InputNumber
              min={1}
              max={selectedProductCountReminder ?? undefined}
              className="w-full"
              placeholder="Soni"
            />
          </Form.Item>

          <Form.Item
            name="price"
            label="Narxi"
            rules={[{ required: true }]}
            className="min-w-[200px] grow"
          >
            <InputNumber min={0} className="w-full" placeholder="Narxi" />
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
