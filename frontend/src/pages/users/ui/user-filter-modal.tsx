import { Button, Col, Form, Input, Row, Select } from "antd";
import { useEffect } from "react";
import { useToken } from "antd/es/theme/internal";
import PhoneInput from "../../../components/form/phone-input";
import { useGetAllUserRoles } from "../../../config/queries/user-role/user-role-querys";

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
  const { data: userRolesList } = useGetAllUserRoles();

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
          <Form.Item label="Username" name="username">
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item label="Telefon" name="phone">
            <PhoneInput />
          </Form.Item>
          <Form.Item label="Faydalanuvch role" name="roleId">
            <Select
              placeholder="Tanglang"
              showSearch
              allowClear
              optionFilterProp="label"
            >
              {userRolesList?.data.map((p: any) => (
                <Select.Option key={p.id} value={p.id} label={p.name}>
                  {p.name}
                </Select.Option>
              ))}
            </Select>
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
