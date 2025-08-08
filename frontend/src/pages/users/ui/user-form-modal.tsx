import { Modal, Form, Input, InputNumber } from "antd";
import { useEffect } from "react";
import type {
  CreateUserInput,
  User,
} from "../../../config/queries/users/users-querys";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateUserInput) => void;
  initialValues?: User;
};

export default function UserFormModal({
  open,
  onClose,
  onSubmit,
  initialValues,
}: Props) {
  const [form] = Form.useForm<CreateUserInput>();

  useEffect(() => {
    if (initialValues) {
      const { password, ...rest } = initialValues;
      form.setFieldsValue(rest as any);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } catch (err) {
      // validation error
    }
  };

  return (
    <Modal
      title={
        initialValues
          ? "Foydalanuvchini tahrirlash"
          : "Yangi foydalanuvchi qo‘shish"
      }
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      onOk={handleOk}
      okText={initialValues ? "Saqlash" : "Qo‘shish"}
      cancelText="Bekor qilish"
      destroyOnClose
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
      </Form>
    </Modal>
  );
}
