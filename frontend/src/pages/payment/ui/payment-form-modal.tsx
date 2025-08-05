import { Drawer, Form, Input, Button } from "antd";
import { useEffect } from "react";
import type { CreatePaymentInput } from "../../../config/queries/payment/payment-querys";
import { useThemeContext } from "../../../providers/theme-provider";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; icon: string }) => void;
  initialValues?: { name: string; icon: string };
};

export default function PaymentFormModal({
  open,
  onClose,
  onSubmit,
  initialValues,
}: Props) {
  const [form] = Form.useForm<CreatePaymentInput>();

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
      title={initialValues ? "Payment turini tahrirlash" : "Yangi Payment turi"}
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
          label="Nomi"
          rules={[
            { required: true, message: "Iltimos to'lov turini kiriting" },
          ]}
        >
          <Input placeholder="To'lov turi" />
        </Form.Item>

        <Form.Item
          name="icon"
          label="Ikon (emoji)"
          rules={[
            { required: true, message: "Iltimos, emoji belgini kiriting" },
          ]}
        >
          <Input placeholder="Masalan, 💵" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          {initialValues ? "Saqlash" : "Qo‘shish"}
        </Button>
      </Form>
    </Drawer>
  );
}
