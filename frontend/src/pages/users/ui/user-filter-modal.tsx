// src/pages/users/ui/user-filter-modal.tsx
import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import { useEffect } from "react";
import { useToken } from "antd/es/theme/internal";

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string>) => void;
  initialValues: Record<string, string>;
};

export default function UsersFilterModal({
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
  }, [open, initialValues, form]);

  const handleSubmit = () => {
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
      <Form layout="vertical" form={form} initialValues={initialValues}>
        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          <Form.Item label="Ism" name="name">
            <Input placeholder="Ism" />
          </Form.Item>
          <Form.Item label="Login" name="username">
            <Input placeholder="Login" />
          </Form.Item>
          <Form.Item label="Telefon" name="phone">
            <Input placeholder="Telefon" />
          </Form.Item>
          <Form.Item label="Rol ID" name="roleId">
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Rol ID"
              min={1}
            />
          </Form.Item>
          <Form.Item label="Telegram Chat ID" name="chatId">
            <Input placeholder="Chat ID" />
          </Form.Item>
        </div>

        <Row justify="end" gutter={12}>
          <Col>
            <Button onClick={handleClear}>Tozalash</Button>
          </Col>
          <Col>
            <Button type="primary" onClick={handleSubmit}>
              Qo‘llash
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
