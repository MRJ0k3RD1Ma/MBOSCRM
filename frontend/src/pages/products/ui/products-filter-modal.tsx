import { Modal, Form, Input, Select } from "antd";

const { Option } = Select;

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string>) => void;
  initialValues: Record<string, string>;
};

export default function ProductsFilterModal({
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
      title="Maxsulotlar bo‘yicha filter"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okText="Qo‘llash"
      cancelText="Bekor qilish"
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item label="Nomi" name="name">
          <Input placeholder="Masalan: Apple" />
        </Form.Item>
        <Form.Item label="Shtrix kod" name="barcode">
          <Input placeholder="Masalan: 1234567890123" />
        </Form.Item>
        <Form.Item label="Shtrix ID" name="barcodeId">
          <Input placeholder="Masalan: 1000001" />
        </Form.Item>
        <Form.Item label="Guruh ID" name="groupId">
          <Input placeholder="Masalan: 1" />
        </Form.Item>
        <Form.Item label="Birlik ID" name="unitId">
          <Input placeholder="Masalan: 1" />
        </Form.Item>
        <Form.Item label="Turi" name="type">
          <Select placeholder="Tanlang">
            <Option value="DEVICE">DEVICE</Option>
            <Option value="SERVICE">SERVICE</Option>
            <Option value="OTHER">OTHER</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
