import { Form, Input, Modal } from "antd";
import { useEffect } from "react";

type SupplierFormValues = {
  name: string;
  phone: string;
  phoneTwo?: string;
  description?: string;
  balance?: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: SupplierFormValues) => void;
  initialValues?: SupplierFormValues | null;
};

export default function SupplierFormModal({
  open,
  onClose,
  onSubmit,
  initialValues,
}: Props) {
  const [form] = Form.useForm<SupplierFormValues>();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      onClose();
    });
  };

  return (
    <Modal
      open={open}
      title={
        initialValues
          ? "Yetkazib beruvchini tahrirlash"
          : "Yangi yetkazib beruvchi"
      }
      onCancel={onClose}
      onOk={handleOk}
      okText="Saqlash"
      cancelText="Bekor qilish"
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Nomi"
          name="name"
          rules={[{ required: true, message: "Iltimos, nomini kiriting" }]}
        >
          <Input placeholder="Yetkazib beruvchi nomi" />
        </Form.Item>

        <Form.Item
          label="Telefon"
          name="phone"
          rules={[{ required: true, message: "Telefon raqamni kiriting" }]}
        >
          <Input placeholder="+998901234567" />
        </Form.Item>

        <Form.Item label="Qo‘shimcha telefon" name="phoneTwo">
          <Input placeholder="+998901234568" />
        </Form.Item>

        <Form.Item label="Izoh" name="description">
          <Input.TextArea placeholder="Qo‘shimcha ma'lumotlar..." rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
