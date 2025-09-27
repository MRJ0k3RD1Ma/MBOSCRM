import { Button, Col, Form, Input, Row, Select } from "antd";

import PhoneInput from "../../../components/form/phone-input";
import { useEffect } from "react";
import { useToken } from "antd/es/theme/internal";

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, any>) => void;
  initialValues: Record<string, any>;
  clients: any;
};

const { Option } = Select;

export default function SimCardFilter({
  open,
  onClose,
  onApply,
  initialValues,
  clients,
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
      const cleaned = Object.fromEntries(
        Object.entries(values).filter(([_, v]) => v !== undefined && v !== "")
      );
      onApply(cleaned);
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
      <Form layout="vertical" form={form}>
        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          <Form.Item label="Mijoz" name="clientId">
            <Select
              placeholder="Mijozni tanlang"
              allowClear
              showSearch
              optionFilterProp="label"
            >
              {clients?.data.map((client: any) => (
                <Option key={client.id} value={client.id} label={client.name}>
                  {client.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Kompaniya" name="company">
            <Input placeholder="Kompaniya" />
          </Form.Item>

          <Form.Item label="Telefon raqami" name="phoneNumber">
            <PhoneInput />
          </Form.Item>

          <Form.Item label="Izoh" name="description">
            <Input placeholder="Izoh" />
          </Form.Item>

          <Form.Item
            label="Holati"
            name="isActive"
            getValueFromEvent={(val) =>
              val === undefined ? undefined : Boolean(val)
            }
          >
            <Select placeholder="Holatini tanlang" allowClear>
              <Option value={true}>Aktiv</Option>
              <Option value={false}>O‘chirilgan</Option>
            </Select>
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
