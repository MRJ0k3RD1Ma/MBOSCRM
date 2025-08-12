import { Button, Col, Form, Input, DatePicker, Select, Row } from "antd";
import { useEffect } from "react";
import { useToken } from "antd/es/theme/internal";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Option } = Select;

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: (values: Record<string, any>) => void;
  initialValues?: Record<string, any>;
};

export default function PaidOtherFilterModal({
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

  const handleFinish = (values: any) => {
    const filters = {
      ...values,
      paidDateFrom: values.paidDateRange?.[0]
        ? dayjs(values.paidDateRange[0]).format("YYYY-MM-DD")
        : undefined,
      paidDateTo: values.paidDateRange?.[1]
        ? dayjs(values.paidDateRange[1]).format("YYYY-MM-DD")
        : undefined,
    };
    delete filters.paidDateRange;
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
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
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={initialValues}
      >
        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          <Form.Item name="groupId" label="Guruh">
            <Input placeholder="Guruh ID" />
          </Form.Item>

          <Form.Item name="type" label="Turi">
            <Select allowClear placeholder={"turini tanglang"}>
              <Option value="INCOME">Kirim</Option>
              <Option value="OUTCOME">Chiqim</Option>
            </Select>
          </Form.Item>

          <Form.Item name="paidDateRange" label="To‘langan sana oralig‘i">
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="description" label="Izoh">
            <Input placeholder="Izoh bo‘yicha qidirish" />
          </Form.Item>
        </div>

        <Row justify="end" gutter={12} style={{ marginTop: 10 }}>
          <Col>
            <Button onClick={handleReset}>Tozalash</Button>
          </Col>
          <Col>
            <Button type="primary" onClick={() => form.submit()}>
              Qo‘llash
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
