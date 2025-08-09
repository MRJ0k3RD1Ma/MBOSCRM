import { Drawer, Form, Input, InputNumber, Button } from "antd";
import { useEffect } from "react";
import type {
  CreateUserInput,
  User,
} from "../../../config/queries/users/users-querys";
import { useThemeContext } from "../../../providers/theme-provider";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateUserInput) => void;
  initialValues?: User;
};

export default function UserFormDrawer({
  open,
  onClose,
  onSubmit,
  initialValues,
}: Props) {
  const [form] = Form.useForm<CreateUserInput>();
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  useEffect(() => {
    if (initialValues) {
      const { password, ...rest } = initialValues;
      form.setFieldsValue(rest as any);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } catch {
      // validation error
    }
  };

  return (
    <Drawer
      title={
        initialValues
          ? "Foydalanuvchini tahrirlash"
          : "Yangi foydalanuvchi qo‘shish"
      }
      open={open}
      onClose={() => {
        form.resetFields();
        onClose();
      }}
      destroyOnClose
      width={400}
      bodyStyle={{
        background: isDark ? "#001529" : "#ffffff",
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Ism"
          rules={[{ required: true, message: "Ismni kiriting" }]}
        >
          <Input placeholder="Ism" />
        </Form.Item>

        <Form.Item
          name="username"
          label="Login"
          rules={[{ required: true, message: "Login kiriting" }]}
        >
          <Input placeholder="Login" />
        </Form.Item>

        {!initialValues && (
          <Form.Item
            name="password"
            label="Parol"
            rules={[{ required: true, message: "Parol kiriting" }]}
          >
            <Input.Password placeholder="Parol" />
          </Form.Item>
        )}

        <Form.Item name="phone" label="Telefon">
          <Input placeholder="+998901234567" />
        </Form.Item>

        <Form.Item name="roleId" label="Rol ID">
          <InputNumber style={{ width: "100%" }} placeholder="Rol ID" min={1} />
        </Form.Item>

        <Form.Item name="chatId" label="Telegram Chat ID">
          <Input placeholder="Telegram Chat ID" />
        </Form.Item>
        <Button type="primary" htmlType="submit" onClick={handleSubmit} block>
          {initialValues ? "Saqlash" : "Qo‘shish"}
        </Button>
      </Form>
    </Drawer>
  );
}
