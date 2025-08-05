import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import { useEffect } from "react";
import { useToken } from "antd/es/theme/internal";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string>) => void;
  initialValues: Record<string, string>;
};

export default function PaidClientFilter({
  open,
  onClose,
  onApply,
  initialValues,
}: Props) {
  const [form] = Form.useForm();
  const [, token] = useToken();

  useEffect(() => {
    if (open) {
      const formattedInitial = {
        ...initialValues,
        payingDate:
          initialValues.payingDateFrom && initialValues.payingDateTo
            ? [
                dayjs(initialValues.payingDateFrom),
                dayjs(initialValues.payingDateTo),
              ]
            : undefined,
      };
      form.setFieldsValue(formattedInitial);
    }
  }, [open]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const filters = {
        ...values,
        payingDateFrom: values.payingDate?.[0]?.toISOString(),
        payingDateTo: values.payingDate?.[1]?.toISOString(),
      };
      delete filters.payingDate;
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
      <Form layout="vertical" form={form}>
        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          <Form.Item label="Mijoz nomi" name="clientName">
            <Input placeholder="Mijoz nomi" />
          </Form.Item>
          <Form.Item label="Sale kodi" name="saleCode">
            <Input placeholder="Sale kodi" />
          </Form.Item>
          <Form.Item label="To‘lov ID" name="paymentId">
            <Input placeholder="To‘lov ID" />
          </Form.Item>
          <Form.Item label="To‘lov sanasi" name="payingDate">
            <RangePicker
              placeholder={["Boshlanish sanasi", "Tugash sanasi"]}
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
            />
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
