import { Form, Input, Button,  Row, Col } from "antd";
import { useToken } from "antd/es/theme/internal";
import { useEffect } from "react";

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
  const [, token] = useToken();

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues);
    }
  }, [open]);

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

  if (!open) return null;

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        color: token.colorText,
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        boxShadow: token.boxShadowSecondary,
        border: `1px solid ${token.colorBorderSecondary}`,
      }}
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

        <Row justify="end" gutter={12}>
          <Col>
            <Button onClick={handleClear}>Tozalash</Button>
          </Col>
          <Col>
            <Button type="primary" onClick={handleOk}>
              Qo‘llash
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
