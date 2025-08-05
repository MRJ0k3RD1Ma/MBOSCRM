import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { useEffect } from "react";
import { useToken } from "antd/es/theme/internal";
import { useGetAllProductUnits } from "../../../config/queries/products/product-unit-querys";
import { useGetAllProductGroups } from "../../../config/queries/products/product-gorup-querys";

const { Option } = Select;

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, any>) => void;
  initialValues: Record<string, any>;
};

export default function ProductsFilterModal({
  open,
  onClose,
  onApply,
  initialValues,
}: Props) {
  const [form] = Form.useForm();
  const [, token] = useToken();
  const { data: unitsData } = useGetAllProductUnits();
  const { data: groupData } = useGetAllProductGroups();

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
      onApply(values);
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
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="Nomi" name="name">
              <Input placeholder="Masalan: Apple" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Shtrix kod" name="barcode">
              <Input placeholder="1234567890123" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Guruh ID" name="groupId">
              <Select placeholder="Tanlang" showSearch optionFilterProp="label">
                {groupData?.data.map((item) => (
                  <Select.Option
                    key={item.id}
                    value={item.id}
                    label={item.name}
                  >
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Birlik ID" name="unitId">
              <Select placeholder="Tanlang" showSearch optionFilterProp="label">
                {unitsData?.data.map((item) => (
                  <Select.Option
                    key={item.id}
                    value={item.id}
                    label={item.name}
                  >
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Narxi (dan)" name="minPrice">
              <InputNumber style={{ width: "100%" }} placeholder="10000" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Minimal Soni" name="minCount">
              <InputNumber style={{ width: "100%" }} placeholder="5" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Turi" name="type">
              <Select placeholder="Tanlang" allowClear>
                <Option value="DEVICE">Qurilma</Option>
                <Option value="SERVICE">Xizmat</Option>
                <Option value="SUBSCRIPTION">Obuna</Option>
              </Select>
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
