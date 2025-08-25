import { Button, Col, DatePicker, Form, Row, Select } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useEffect } from "react";
import useToken from "antd/es/theme/useToken";

dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string | number>) => void;
  initialValues: Record<string, string | number>;
  suppliers: { id: number; name: string }[];
  payments: { id: number; name: string }[];
};

const { RangePicker } = DatePicker;

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
      paidDateRange:
        initialValues.minPaidDate && initialValues.maxPaidDate
          ? [
              dayjs(initialValues.minPaidDate).tz("Asia/Tashkent"),
              dayjs(initialValues.maxPaidDate).tz("Asia/Tashkent"),
            ]
          : [],
    });
  }, [initialValues]);

  const handleApply = () => {
    form.validateFields().then((values) => {
      const filters = {
        ...values,
        minPaidDate: values.paidDateRange?.[0]
          ? dayjs(values.paidDateRange[0])
              .tz("Asia/Tashkent")
              .format("YYYY-MM-DD")
          : undefined,
        maxPaidDate: values.paidDateRange?.[1]
          ? dayjs(values.paidDateRange[1])
              .tz("Asia/Tashkent")
              .format("YYYY-MM-DD")
          : undefined,
      };
      delete filters.paidDateRange;
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
            <Form.Item label="To‘lov sanasi oralig‘i" name="paidDateRange">
              <RangePicker
                style={{ width: "100%" }}
                format="YYYY-MM-DD"
                allowClear
              />
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
