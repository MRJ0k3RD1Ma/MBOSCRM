import { Button, Col, Form, InputNumber, Row, Select } from "antd";
import { useEffect } from "react";
import { useToken } from "antd/es/theme/internal";
import { useGetAllArrived } from "../../../config/queries/arrived/arrived-qureys";
import { useGetAllSuppliers } from "../../../config/queries/supplier/supplier-querys";
import { useGetAllProducts } from "../../../config/queries/products/products-querys";

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, any>) => void;
  initialValues: Record<string, any>;
};

export default function ArrivedProductsFilterModal({
  open,
  onClose,
  onApply,
  initialValues,
}: Props) {
  const [form] = Form.useForm();
  const [, token] = useToken();

  const { data: arriveds } = useGetAllArrived({ page: 1, limit: 100 });
  const { data: suppliers } = useGetAllSuppliers({ page: 1, limit: 100 });
  const { data: products } = useGetAllProducts({ page: 1, limit: 100 });

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
          <Form.Item label="Minimal narx" name="minPrice">
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              placeholder="Minimal narx"
            />
          </Form.Item>
          <Form.Item label="Maksimal narx" name="maxPrice">
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              placeholder="Maksimal narx"
            />
          </Form.Item>

          <Form.Item label="Kirim" name="arrivedId">
            <Select
              allowClear
              placeholder="Kirimni tanlang"
              options={
                arriveds?.data?.map((a: any) => ({
                  label: `${a.code || "ID:" + a.id} - ${a.date}`,
                  value: a.id,
                })) || []
              }
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>

          <Form.Item label="Yetkazib beruvchi" name="supplierId">
            <Select
              allowClear
              placeholder="Yetkazib beruvchini tanlang"
              options={
                suppliers?.data?.map((s: any) => ({
                  label: s.name,
                  value: s.id,
                })) || []
              }
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>

          <Form.Item label="Mahsulot" name="productId">
            <Select
              allowClear
              placeholder="Mahsulotni tanlang"
              options={
                products?.data?.map((p: any) => ({
                  label: p.name,
                  value: p.id,
                })) || []
              }
              showSearch
              optionFilterProp="label"
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
