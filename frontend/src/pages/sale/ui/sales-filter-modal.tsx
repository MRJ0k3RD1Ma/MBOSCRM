import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useEffect } from "react";
import { useToken } from "antd/es/theme/internal";
import dayjs from "dayjs";
import { useGetAllClients } from "../../../config/queries/clients/clients-querys";

const { Option } = Select;
const { RangePicker } = DatePicker;

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, any>) => void;
  initialValues: Record<string, any>;
};

export default function SalesFilterModal({
  open,
  onClose,
  onApply,
  initialValues,
}: Props) {
  const [form] = Form.useForm();
  const [, token] = useToken();
  const { data: clientData } = useGetAllClients();

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues);
    }
  }, [open]);

  const handleClear = () => {
    form.resetFields();
    onApply({});
    onClose();
  };

  const handleApply = () => {
    form.validateFields().then((values) => {
      const filters = {
        ...values,
        fromDate: values.dateRange?.[0]
          ? dayjs(values.dateRange[0]).format("YYYY-MM-DD")
          : undefined,
        toDate: values.dateRange?.[1]
          ? dayjs(values.dateRange[1]).format("YYYY-MM-DD")
          : undefined,
      };
      delete filters.dateRange;

      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== undefined && v !== "")
      );

      onApply(cleanedFilters);
      onClose();
    });
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
        initialValues={{
          ...initialValues,
          dateRange:
            initialValues.fromDate && initialValues.toDate
              ? [dayjs(initialValues.fromDate), dayjs(initialValues.toDate)]
              : undefined,
        }}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Kod" name="code">
              <Input placeholder="Savdo kodi (masalan: SALE-001)" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Mijoz" name="clientId">
              <Select
                placeholder="Mijozni tanlang"
                showSearch
                optionFilterProp="label"
              >
                {clientData?.data.map((client) => (
                  <Option key={client.id} value={client.id} label={client.name}>
                    {client.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Minimal narx" name="minPrice">
              <Input placeholder="Minimal narx kiriting" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Maksimal narx" name="maxPrice">
              <Input placeholder="Maksimal narx kiriting" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Sana oralig‘i" name="dateRange">
              <RangePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end" gutter={8}>
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
