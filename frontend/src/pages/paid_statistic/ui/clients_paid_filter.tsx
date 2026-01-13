import { Button, Col, Form, Input, Select, Row } from "antd";
import { useEffect } from "react";
import { useToken } from "antd/es/theme/internal";
import dayjs from "dayjs";
import PhoneInput from "../../../components/form/phone-input";

const { Option } = Select;

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: (values: Record<string, any>) => void;
  initialValues?: Record<string, any>;
};

export default function ClientsPaidFilter({
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
      name: values.name || undefined,
      phone: values.phone || undefined,
      sortBy: values.sortBy || undefined,
      sortOrder: values.sortOrder || undefined,
      fromDate: values.dateRange?.[0]
        ? dayjs(values.dateRange[0]).format("YYYY-MM-DD")
        : undefined,
      toDate: values.dateRange?.[1]
        ? dayjs(values.dateRange[1]).format("YYYY-MM-DD")
        : undefined,
    };

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
        padding: 16,
        borderRadius: 8,
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
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          <Form.Item name="name" label="Mijoz nomi">
            <Input placeholder="Mijoz nomi bo‘yicha qidirish" />
          </Form.Item>

          <Form.Item name="phone" label="Telefon raqam">
            <PhoneInput />
          </Form.Item>

          <Form.Item name="sortBy" label="Sortlash turi">
            <Select placeholder="Maydonni tanlang" allowClear>
              <Option value="totalPaid">To‘lagan pullari</Option>
              <Option value="totalSale">Mahsulot summasi</Option>
              <Option value="totalSub">
                Obuna uchun yechilgan pullar
              </Option>
            </Select>
          </Form.Item>

          <Form.Item name="sortOrder" label="O‘sish / kamayish">
            <Select placeholder="Yo‘nalish" allowClear>
              <Option value="desc">O‘sish (↑)</Option>
              <Option value="asc">Kamayish (↓)</Option>
            </Select>
          </Form.Item>
        </div>

        <Row justify="end" gutter={12} style={{ marginTop: 12 }}>
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
