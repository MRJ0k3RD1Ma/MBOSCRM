import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useEffect } from "react";
import { useToken } from "antd/es/theme/internal";
import { useGetAllPayments } from "../../../config/queries/payment/payment-querys";

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string>) => void;
  initialValues: Record<string, string>;
};

export default function PaidServersFilterModal({
  open,
  onClose,
  onApply,
  initialValues,
}: Props) {
  const [form] = Form.useForm();
  const [, token] = useToken();
  const { data: payments } = useGetAllPayments({ page: 1, limit: 1000 });

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues);
    }
  }, [open]);

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
          <Form.Item label="To‘lov turi " name="paymentId">
            <Select
              placeholder="To‘lovni tanlang"
              showSearch
              optionFilterProp="label"
            >
              {payments?.data.map((p) => (
                <Select.Option key={p.id} value={p.id} label={p.name}>
                  {p.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Sanasi" name="fromDate">
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Izoh" name="description">
            <Input placeholder="Izoh" />
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
