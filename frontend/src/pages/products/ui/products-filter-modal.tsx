import { Modal, Form, Input, Select, InputNumber, Row, Col } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, any>) => void;
  initialValues: Record<string, any>;
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
  const handleClear = () => {
    form.resetFields();
    onApply({});
    onClose();
  };

  return (
    <Modal
      title="Maxsulotlar bo‘yicha filter"
      open={open}
      onOk={handleOk}
      onCancel={handleClear}
      okText="Qo‘llash"
      cancelText="Tozalash"
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ...initialValues,
          createdAt: initialValues.createdAtFrom
            ? [
                dayjs(initialValues.createdAtFrom),
                dayjs(initialValues.createdAtTo),
              ]
            : undefined,
          updatedAt: initialValues.updatedAtFrom
            ? [
                dayjs(initialValues.updatedAtFrom),
                dayjs(initialValues.updatedAtTo),
              ]
            : undefined,
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Nomi" name="name">
              <Input placeholder="Masalan: Apple" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Shtrix kod" name="barcode">
              <Input placeholder="Masalan: 1234567890123" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Guruh ID" name="groupId">
              <Input placeholder="Masalan: 1" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Birlik ID" name="unitId">
              <Input placeholder="Masalan: 1" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Narxi (dan)" name="minPrice">
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Masalan: 10000"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Minimal Soni" name="minCount">
              <InputNumber style={{ width: "100%" }} placeholder="Masalan: 5" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Turi" name="type">
              <Select placeholder="Tanlang">
                <Option value="DEVICE">DEVICE</Option>
                <Option value="SERVICE">SERVICE</Option>
                <Option value="OTHER">OTHER</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Holati" name="status">
              <Select placeholder="Tanlang">
                <Option value="ACTIVE">ACTIVE</Option>
                <Option value="INACTIVE">INACTIVE</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
