import {
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Row,
  Col,
} from "antd";
import { useEffect } from "react";
import type { CreateProductInput } from "../../../config/queries/products/products-querys";
import type { ProductUnit } from "../../../config/queries/products/product-unit-querys";
import type { ProductGroup } from "../../../config/queries/products/product-gorup-querys";
import { useThemeContext } from "../../../providers/theme-provider";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateProductInput) => void;
  initialValues?: Partial<CreateProductInput> | null;
  units: ProductUnit[];
  group: ProductGroup[];
}

export default function ProductsModal({
  open,
  onClose,
  onSubmit,
  initialValues,
  units,
  group,
}: Props) {
  const [form] = Form.useForm<CreateProductInput>();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch {}
  };
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  return (
    <Drawer
      title={initialValues ? "Mahsulotni tahrirlash" : "Yangi mahsulot"}
      onClose={() => {
        form.resetFields();
        onClose();
      }}
      open={open}
      destroyOnClose
      width={720}
      bodyStyle={{
        background: isDark ? "#001529" : "#ffffff",
      }}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Nomi"
              rules={[{ required: true, message: "Mahsulot nomini kiriting" }]}
            >
              <Input placeholder="Masalan: Apple Watch" className="!w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="barcode" label="Shtrix kod">
              <Input placeholder="1234567890123" className="!w-full" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="groupId"
              label="Guruh"
              rules={[{ required: true, message: "Guruh tanlang" }]}
            >
              <Select
                className="!w-full"
                placeholder="Guruh tanlang"
                showSearch
                optionFilterProp="label"
                options={group.map((g) => ({
                  value: g.id,
                  label: g.name,
                }))}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="unitId"
              label="Birlik"
              rules={[{ required: true, message: "Birlik tanlang" }]}
            >
              <Select
                className="!w-full"
                placeholder="Birlik tanlang"
                showSearch
                optionFilterProp="label"
                options={units.map((u) => ({
                  value: u.id,
                  label: u.name,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="priceIncome"
              label="Kelgan narxi"
              rules={[{ required: true, message: "Kelgan narxini kiriting" }]}
            >
              <InputNumber min={0} className="!w-full" placeholder="5000" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="reminderFirst"
              label="Dastlabki qoldiq"
              rules={[
                { required: true, message: "Dastlabki qoldiqni kiriting" },
              ]}
            >
              <InputNumber min={0} className="!w-full" placeholder="50" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="price"
              label="Sotuv narxi"
              rules={[{ required: true, message: "Narxini kiriting" }]}
            >
              <InputNumber min={0} className="!w-full" placeholder="10000" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="type" label="Turi">
              <Select placeholder="Mahsulot turi">
                <Select.Option value="DEVICE">DEVICE</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="countReminder"
              label="Qoldiq"
              rules={[{ required: true, message: "Qoldiq sonini kiriting" }]}
            >
              <InputNumber min={0} className="!w-full" placeholder="10" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="countArrived"
              label="Kelgan soni"
              rules={[{ required: true, message: "Kelgan sonini kiriting" }]}
            >
              <InputNumber min={0} className="!w-full" placeholder="100" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="countSale"
              label="Sotilgan soni"
              rules={[{ required: true, message: "Sotilgan sonini kiriting" }]}
            >
              <InputNumber min={0} className="!w-full" placeholder="90" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="description" label="Izoh">
              <Input.TextArea rows={3} placeholder="Qo‘shimcha ma’lumot..." />
            </Form.Item>
          </Col>
        </Row>

        <Button type="primary" htmlType="submit" block>
          {initialValues ? "Saqlash" : "Qo‘shish"}
        </Button>
      </Form>
    </Drawer>
  );
}
