import { Button, Col, DatePicker, Form, InputNumber, Row, Select } from "antd";
import { useEffect } from "react";
import { useToken } from "antd/es/theme/internal";
import { useGetAllClients } from "../../../config/queries/clients/clients-querys";
import { useGetAllSale } from "../../../config/queries/sale/sale-querys";

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, any>) => void;
  initialValues: Record<string, any>;
};

const { RangePicker } = DatePicker;

export default function SubscribesFilterModal({
  open,
  onClose,
  onApply,
  initialValues,
}: Props) {
  const [form] = Form.useForm();
  const [, token] = useToken();

  const { data: clients } = useGetAllClients({ page: 1, limit: 100 });
  const { data: sales } = useGetAllSale({ page: 1, limit: 100 });

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues);
    }
  }, [open]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const { dateRange, ...rest } = values;
      const filters = {
        ...rest,
        ...(dateRange?.[0] ? { fromDate: dateRange[0].toISOString() } : {}),
        ...(dateRange?.[1] ? { toDate: dateRange[1].toISOString() } : {}),
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
      <Form layout="vertical" form={form}>
        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          <Form.Item label="Minimal narx" name="minPrice">
            <InputNumber style={{ width: "100%" }} min={0} placeholder="0" />
          </Form.Item>
          <Form.Item label="Maksimal narx" name="maxPrice">
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              placeholder="10000"
            />
          </Form.Item>
          <Form.Item label="Sana oralig‘i" name="dateRange">
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Mijoz" name="clientId">
            <Select
              allowClear
              showSearch
              placeholder="Mijozni tanlang"
              optionFilterProp="label"
            >
              {clients?.data?.map((client) => (
                <Select.Option
                  key={client.id}
                  value={client.id}
                  label={client.name}
                >
                  {client.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Sotuv" name="saleId">
            <Select
              allowClear
              showSearch
              placeholder="Sotuvni tanlang"
              optionFilterProp="label"
            >
              {sales?.data?.map((sale) => (
                <Select.Option key={sale.id} value={sale.id} label={sale.code}>
                  {sale.code}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Holat" name="state">
            <Select allowClear placeholder="Tanlang">
              <Select.Option value="PAID">To'langan </Select.Option>
              <Select.Option value="NOTPAYING">To'lanmagan </Select.Option>
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
