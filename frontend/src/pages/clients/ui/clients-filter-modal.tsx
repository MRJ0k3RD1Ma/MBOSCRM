import { Modal, Form, Input } from "antd";

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string>) => void;
  initialValues: Record<string, string>;
};

export default function ClientsFilterModal({
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

  return (
    <Modal
      title="Filterlar"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okText="Qo‘llash"
      cancelText="Bekor qilish"
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item label="Nomi" name="name">
          <Input placeholder="Nomi" />
        </Form.Item>
        <Form.Item label="Manzil" name="address">
          <Input placeholder="Manzil" />
        </Form.Item>
        <Form.Item label="Izoh" name="description">
          <Input placeholder="Izoh" />
        </Form.Item>
        <Form.Item label="Telefon" name="phone">
          <Input placeholder="Telefon" />
        </Form.Item>
        <Form.Item label="INN" name="inn">
          <Input placeholder="INN" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
