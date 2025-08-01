import {
  Drawer,
  Form,
  InputNumber,
  Space,
  Button,
  Divider,
  Select,
  message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { Arrived } from "../../../config/queries/arrived/arrived-qureys";
import {
  useGetAllProducts,
  type Product,
} from "../../../config/queries/products/products-querys";
import { useCreateArrivedProduct } from "../../../config/queries/arrived/arrived-product-querys";

type Props = {
  dataSource: Arrived[];
  open: boolean;
  onClose: () => void;
};

export default function ArrivedProductFormModal({
  dataSource,
  open,
  onClose,
}: Props) {
  const [form] = Form.useForm();
  const [arrivedList, setArrivedList] = useState<Arrived[]>([]);
  const createArrived = useCreateArrivedProduct();
  const { data: productId } = useGetAllProducts();

  useEffect(() => {
    if (open) {
      form.resetFields();
      setArrivedList(dataSource);
    }
  }, [open, dataSource]);

  const onFinish = async () => {
    try {
      const values = await form.validateFields();

      const { arrivedId, products } = values;

      const payload = products.map((product: any) => ({
        ...product,
        arrivedId,
      }));

      payload.forEach((item: any) => {
        createArrived.mutate(item);
      });

      message.success("Mahsulotlar muvaffaqiyatli qo‘shildi");
      onClose();
      form.resetFields();
    } catch (error) {
      message.error("Iltimos, barcha maydonlarni to‘ldiring");
    }
  };

  return (
    <Drawer
      title="Keltirilgan mahsulotlar"
      open={open}
      onClose={onClose}
      width={480}
      destroyOnClose
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        name="arrived_products"
      >
        <Form.Item
          name="arrivedId"
          label="Qaysi keltirilganga mahsulot qo‘shiladi?"
          rules={[{ required: true, message: "Arrived tanlang" }]}
        >
          <Select
            placeholder="Arrived tanlang"
            showSearch
            optionFilterProp="label"
          >
            {arrivedList.map((arrived) => (
              <Select.Option
                key={arrived.id}
                value={arrived.id}
                label={arrived.description}
              >
                {arrived.description}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
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
                      {
                        required: true,
                        message: "Yetkazilgan mahsulotni tanlang",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Yetkazilgan mahsulot"
                      showSearch
                      optionFilterProp="label"
                    >
                      {productId?.data.map((product: Product) => (
                        <Select.Option
                          key={product.id}
                          value={product.id}
                          label={product.name}
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

        <Divider />

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Saqlash
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
