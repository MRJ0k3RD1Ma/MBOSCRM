import { Drawer, Form, Input, Button, DatePicker } from "antd";
import { useEffect } from "react";
import { useThemeContext } from "../../../providers/theme-provider";

export interface CreateServerInput {
  name: string;
  ip: string;
  port: string;
  plan?: string;
  responsible?: string;
  description?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: any;
  initialValues?: any;
}

export default function ServerFormModal({
  open,
  onClose,
  onSubmit,
  initialValues,
}: Props) {
  const [form] = Form.useForm<any>();
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

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
      title={initialValues ? "Serverni tahrirlash" : "Yangi Server"}
      onClose={() => {
        form.resetFields();
        onClose();
      }}
      open={open}
      destroyOnClose
      width={400}
      bodyStyle={{
        background: isDark ? "#001529" : "#ffffff",
      }}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="Server nomi"
          rules={[
            { required: true, message: "Iltimos, server nomini kiriting" },
          ]}
        >
          <Input placeholder="Server nomi" />
        </Form.Item>

        <Form.Item
          name="ip"
          label="IP manzili"
          rules={[{ required: true, message: "Iltimos, IP manzil kiriting" }]}
        >
          <Input placeholder="192.168.0.1" />
        </Form.Item>

        <Form.Item
          name="port"
          label="Port"
          rules={[{ required: true, message: "Iltimos, port kiriting" }]}
        >
          <Input placeholder="8080" />
        </Form.Item>

        <Form.Item name="plan" label="Tarif reja">
          <Input placeholder="Masalan: Basic, Premium" />
        </Form.Item>

        <Form.Item name="responsible" label="Mas'ul shaxs">
          <Input placeholder="Mas'ul shaxs ismi" />
        </Form.Item>

        <Form.Item name="description" label="Izoh">
          <Input.TextArea rows={3} placeholder="Qo‘shimcha izoh..." />
        </Form.Item>
        <Form.Item
          name="endDate"
          label="Tugash sanasi"
          rules={[{ required: true, message: "Tugash sanasini tanlang" }]}
        >
          <DatePicker
            showTime
            style={{ width: "100%" }}
            format="YYYY-MM-DD HH:mm:ss"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          {initialValues ? "Saqlash" : "Qo‘shish"}
        </Button>
      </Form>
    </Drawer>
  );
}
