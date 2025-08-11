import { Button, Col, DatePicker, Form, Row, Select } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import useToken from "antd/es/theme/useToken";

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string | number>) => void;
  initialValues: Record<string, string | number>;
  suppliers: { id: number; name: string }[];
  payments: { id: number; name: string }[];
};

export default function PaidSupplierFilterUI({
  open,
  onClose,
  onApply,
  initialValues,
  suppliers,
  payments,
}: Props) {
  const [form] = Form.useForm();
  const [, token] = useToken();

  useEffect(() => {
    form.setFieldsValue({
      ...initialValues,
      minPaidDate: initialValues.minPaidDate
        ? dayjs(initialValues.minPaidDate)
        : null,
      maxPaidDate: initialValues.maxPaidDate
        ? dayjs(initialValues.maxPaidDate)
        : null,
    });
  }, [initialValues]);

  const handleApply = () => {
    form.validateFields().then((values) => {
      const filters = {
        ...values,
        minPaidDate: values.minPaidDate
          ? dayjs(values.minPaidDate).tz("Asia/Tashkent").format("YYYY-MM-DD")
          : undefined,
        maxPaidDate: values.maxPaidDate
          ? dayjs(values.maxPaidDate).tz("Asia/Tashkent").format("YYYY-MM-DD")
          : undefined,
      };
      onApply(filters);
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
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="Yetkazib beruvchi" name="supplierId">
              <Select
                placeholder="Tanlang"
                allowClear
                showSearch
                optionFilterProp="label"
                options={suppliers.map((s) => ({
                  label: s.name,
                  value: s.id,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="To‘lov turi" name="paymentId">
              <Select
                placeholder="Tanlang"
                allowClear
                showSearch
                optionFilterProp="label"
                options={payments.map((p) => ({
                  label: p.name,
                  value: p.id,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Minimal to‘lov sanasi" name="minPaidDate">
              <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Maksimal to‘lov sanasi" name="maxPaidDate">
              <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end" gutter={12}>
          <Col>
            <Button onClick={handleClear}>Tozalash</Button>
          </Col>
          <Col>
            <Button type="primary" onClick={handleApply}>
              Qo‘llash
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
