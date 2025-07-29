import { Modal, Form, Input } from "antd";

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string>) => void;
  initialValues: Record<string, string>;
};

export default function SuppliersFilterModal({
  open,
  onClose,
  onApply,
  initialValues,
}: Props) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onApply(values);
      onClose();
    });
  };

  const handleClear = () => {
    form.resetFields();
    onApply({});
    onClose();
  };

  return (
    <Modal
      title="Yetkazib beruvchi filteri"
      open={open}
      onOk={handleOk}
      onCancel={handleClear}
      okText="Qo‘llash"
      cancelText="Tozalash"
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item label="Nomi" name="name">
          <Input placeholder="Yetkazib beruvchi nomi" allowClear />
        </Form.Item>
        <Form.Item label="Izoh" name="description">
          <Input placeholder="Izoh" allowClear />
        </Form.Item>
        <Form.Item label="Telefon" name="phone">
          <Input placeholder="Telefon raqami" allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
}
