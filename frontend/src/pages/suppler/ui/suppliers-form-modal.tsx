import { Drawer, Form, Input, Button, InputNumber } from "antd";
import { useEffect } from "react";

export interface CreateSupplierInput {
  name: string;
  phone: string;
  phoneTwo?: string;
  description?: string;
  balance?: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateSupplierInput) => void;
  initialValues?: Partial<CreateSupplierInput> | null;
}

export default function SuppliersFormModal({
  open,
  onClose,
  onSubmit,
  initialValues,
}: Props) {
  const [form] = Form.useForm<CreateSupplierInput>();

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
    } catch {
      // Validation error, do nothing
    }
  };

  return (
    <Drawer
      title={
        initialValues
          ? "Yetkazib beruvchini tahrirlash"
          : "Yangi yetkazib beruvchi"
      }
      onClose={() => {
        form.resetFields();
        onClose();
      }}
      open={open}
      destroyOnClose
      width={400}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="Nomi"
          rules={[{ required: true, message: "Iltimos nomini kiriting" }]}
        >
          <Input placeholder="Masalan: Grand Supply LLC" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Telefon raqam"
          rules={[{ required: true, message: "Telefon raqamini kiriting" }]}
        >
          <Input placeholder="+998901234567" />
        </Form.Item>

        <Form.Item name="phoneTwo" label="Ikkinchi telefon raqam">
          <Input placeholder="+998901112233" />
        </Form.Item>

        <Form.Item name="description" label="Izoh">
          <Input.TextArea placeholder="Qo‘shimcha izoh..." rows={3} />
        </Form.Item>

        <Form.Item name="balance" label="Balans">
          <InputNumber
            style={{ width: "100%" }}
            placeholder="0"
            min={0}
            step={1000}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          {initialValues ? "Saqlash" : "Qo‘shish"}
        </Button>
      </Form>
    </Drawer>
  );
}
