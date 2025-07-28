import { Drawer, Form, Input, InputNumber, Select, Button } from "antd";
import { useEffect } from "react";
import type { CreateProductInput } from "../../../config/queries/products/products-querys";
import type { ProductUnit } from "../../../config/queries/products/product-unit-querys";
import type { ProductGroup } from "../../../config/queries/products/product-gorup-querys";

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

  return (
    <Drawer
      title={initialValues ? "Mahsulotni tahrirlash" : "Yangi mahsulot"}
      onClose={() => {
        form.resetFields();
        onClose();
      }}
      open={open}
      destroyOnClose
      width={450}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="Nomi"
          rules={[{ required: true, message: "Mahsulot nomini kiriting" }]}
        >
          <Input placeholder="Masalan: Apple Watch" />
        </Form.Item>

        <Form.Item
          name="barcode"
          label="Shtrix kod"
          rules={[{ required: true, message: "Shtrix kod kiriting" }]}
        >
          <Input placeholder="1234567890123" />
        </Form.Item>

        <Form.Item
          name="barcodeId"
          label="Shtrix ID"
          rules={[{ required: true, message: "Shtrix ID kiriting" }]}
        >
          <InputNumber className="w-full" placeholder="1000001" min={1} />
        </Form.Item>

        <Form.Item
          name="groupId"
          label="Guruh ID"
          rules={[{ required: true, message: "Guruh ID kiriting" }]}
        >
          <Select
            placeholder="Birlik tanlang"
            options={group.map((u) => ({
              value: u.id,
              label: u.name,
            }))}
          />
        </Form.Item>
        <Form.Item
          name="unitId"
          label="Birlik"
          rules={[{ required: true, message: "Birlik tanlang" }]}
        >
          <Select
            placeholder="Birlik tanlang"
            options={units.map((u) => ({
              value: u.id,
              label: u.name,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="priceIncome"
          label="Kelgan narxi"
          rules={[{ required: true, message: "Kelgan narxini kiriting" }]}
        >
          <InputNumber min={0} className="w-full" placeholder="5000" />
        </Form.Item>

        <Form.Item
          name="reminderFirst"
          label="Dastlabki qoldiq"
          rules={[{ required: true, message: "Dastlabki qoldiqni kiriting" }]}
        >
          <InputNumber min={0} className="w-full" placeholder="50" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Sotuv narxi"
          rules={[{ required: true, message: "Narxini kiriting" }]}
        >
          <InputNumber min={0} className="w-full" placeholder="10000" />
        </Form.Item>

        <Form.Item
          name="type"
          label="Turi"
          rules={[{ required: true, message: "Turi tanlang" }]}
        >
          <Select placeholder="Mahsulot turi">
            <Select.Option value="DEVICE">DEVICE</Select.Option>
            <Select.Option value="SERVICE">SERVICE</Select.Option>
            <Select.Option value="OTHER">OTHER</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="countReminder"
          label="Qoldiq"
          rules={[{ required: true, message: "Qoldiq sonini kiriting" }]}
        >
          <InputNumber min={0} className="w-full" placeholder="10" />
        </Form.Item>

        <Form.Item
          name="countArrived"
          label="Kelgan soni"
          rules={[{ required: true, message: "Kelgan sonini kiriting" }]}
        >
          <InputNumber min={0} className="w-full" placeholder="100" />
        </Form.Item>

        <Form.Item
          name="countSale"
          label="Sotilgan soni"
          rules={[{ required: true, message: "Sotilgan sonini kiriting" }]}
        >
          <InputNumber min={0} className="w-full" placeholder="90" />
        </Form.Item>

        <Form.Item name="description" label="Izoh">
          <Input.TextArea rows={3} placeholder="Qo‘shimcha ma’lumot..." />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          {initialValues ? "Saqlash" : "Qo‘shish"}
        </Button>
      </Form>
    </Drawer>
  );
}
