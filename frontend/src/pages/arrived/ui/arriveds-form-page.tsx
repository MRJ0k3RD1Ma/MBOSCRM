import {
  Form,
  Input,
  Select,
  DatePicker,
  Space,
  Button,
  InputNumber,
  Divider,
  Row,
  Col,
  message,
  Card,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllSuppliers,
  type Supplier,
} from "../../../config/queries/supplier/supplier-querys";
import {
  useGetAllProducts,
  type Product,
} from "../../../config/queries/products/products-querys";
import { useCreateArrivedProduct } from "../../../config/queries/arrived/arrived-product-querys";
import {
  useCreateArrived,
  useGetArrivedById,
  useUpdateArrived,
} from "../../../config/queries/arrived/arrived-qureys";

export default function ArrivedFormPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const { data: suppliers } = useGetAllSuppliers();
  const { data: products } = useGetAllProducts();

  const createArrived = useCreateArrived();
  const updateArrived = useUpdateArrived();
  const createArrivedProduct = useCreateArrivedProduct();
  const { data: arrivedData } = useGetArrivedById(Number(id), isEdit);

  useEffect(() => {
    if (arrivedData) {
      const patched = {
        ...arrivedData,
        date: dayjs(arrivedData.date),
      };
      form.setFieldsValue(patched);
    }
  }, [arrivedData]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const { products, ...rest } = values;

      if (isEdit) {
        updateArrived.mutate(
          { id: Number(id), ...rest },
          {
            onSuccess: () => {
              message.success("Kirim yangilandi");
              navigate("/arriveds");
            },
          }
        );
      } else {
        createArrived.mutate(rest, {
          onSuccess: (res) => {
            if (products?.length && res?.id) {
              const payload = products.map((p: any) => ({
                ...p,
                arrivedId: res.id,
              }));
              payload.forEach((item: any) => createArrivedProduct.mutate(item));
            }
            message.success("Yangi kirim qo‘shildi");
            navigate("/arrived");
          },
        });
      }
    } catch (err) {
      message.error("Iltimos, barcha maydonlarni to‘ldiring");
    }
  };

  return (
    <Card>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        style={{ padding: 24 }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Ta'rif"
              name="description"
              rules={[{ required: true, message: "Ta'rif kiriting" }]}
            >
              <Input placeholder="Masalan: Avgust oyidagi kirim" />
            </Form.Item>

            <Form.Item
              label="Sana"
              name="date"
              rules={[{ required: true, message: "Sanani tanlang" }]}
            >
              <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item
              label="Kod"
              name="code"
              rules={[{ required: true, message: "Kod kiriting" }]}
            >
              <Input placeholder="Masalan: ARR-001" disabled={isEdit} />
            </Form.Item>

            <Form.Item
              label="Tovar hujjati"
              name="waybillNumber"
              rules={[{ required: true, message: "Tovar hujjatini kiriting" }]}
            >
              <Input placeholder="Masalan: WB123456" />
            </Form.Item>

            <Form.Item
              label="Yetkazib beruvchi"
              name="supplierId"
              rules={[{ required: true, message: "Yetkazib beruvchi tanlang" }]}
            >
              <Select placeholder="Yetkazib beruvchi tanlang">
                {suppliers?.data.map((s: Supplier) => (
                  <Select.Option key={s.id} value={s.id}>
                    {s.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Mahsulotlar"
              name={"products"}
              required
              rules={[
                {
                  validator: async (_, products) => {
                    if (!products || products.length === 0) {
                      return Promise.reject(
                        new Error("Kamida 1 ta mahsulot kiriting")
                      );
                    }
                  },
                },
              ]}
            >
              <Form.List name="products">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "productId"]}
                          rules={[
                            { required: true, message: "Mahsulot tanlang" },
                          ]}
                        >
                          <Select placeholder="Mahsulot">
                            {products?.data.map((product: Product) => (
                              <Select.Option
                                key={product.id}
                                value={product.id}
                              >
                                {product.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "count"]}
                          rules={[{ required: true, message: "Soni kerak" }]}
                        >
                          <InputNumber placeholder="Soni" min={1} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "price"]}
                          rules={[{ required: true, message: "Narxi kerak" }]}
                        >
                          <InputNumber placeholder="Narxi" min={0} />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                        block
                      >
                        Mahsulot qo‘shish
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Saqlash
            </Button>
            <Button onClick={() => navigate("/arriveds")}>Bekor qilish</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
}
