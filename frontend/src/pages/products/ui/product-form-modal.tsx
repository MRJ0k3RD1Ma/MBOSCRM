import {
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Row,
  Col,
  Space,
} from "antd";
import { useEffect } from "react";
import type { Product } from "../../../config/queries/products/products-querys";
import { useGetAllProductUnits } from "../../../config/queries/products/product-unit-querys";
import { useGetAllProductGroups } from "../../../config/queries/products/product-gorup-querys";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    values: Omit<
      Product,
      "id" | "isDeleted" | "createdAt" | "updatedAt" | "creatorId" | "modifyId"
    >
  ) => void;
  initialValues?: Product | null;
};

const PRODUCT_TYPES = [{ label: "Qurilma", value: "DEVICE" }];

export default function ProductFormDrawer({
  open,
  onClose,
  onSubmit,
  initialValues,
}: Props) {
  const [form] = Form.useForm();
  const { data: productUnitId } = useGetAllProductUnits();
  const { data: productGroupId } = useGetAllProductGroups();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      onClose();
    });
  };

  return (
    <Drawer
      open={open}
      title={initialValues ? "Mahsulotni tahrirlash" : "Yangi mahsulot"}
      onClose={onClose}
      width={720}
      extra={
        <Space>
          <Button onClick={onClose}>Bekor qilish</Button>
          <Button type="primary" onClick={handleSubmit}>
            Saqlash
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Nomi" name="name" rules={[{ required: true }]}>
              <Input placeholder="Mahsulot nomi" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Shtrix kod" name="barcode">
              <Input placeholder="1234567890123" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Guruh" name="groupId">
              <Select
                placeholder="Guruhni tanlang"
                showSearch
                optionFilterProp="label"
                options={productGroupId?.data.map((g) => ({
                  label: g.name,
                  value: g.id,
                }))}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="O‘lchov birligi" name="unitId">
              <Select
                placeholder="Birlikni tanlang"
                showSearch
                optionFilterProp="label"
                options={productUnitId?.data.map((u) => ({
                  label: u.name,
                  value: u.id,
                }))}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Kiruvchi narx" name="priceIncome">
              <InputNumber style={{ width: "100%" }} placeholder="5000" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Sotuv narxi" name="price">
              <InputNumber style={{ width: "100%" }} placeholder="10000" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Boshlang‘ich qoldiq" name="reminderFirst">
              <InputNumber style={{ width: "100%" }} placeholder="50" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Joriy qoldiq" name="countReminder">
              <InputNumber style={{ width: "100%" }} placeholder="10" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Keltirilgan soni" name="countArrived">
              <InputNumber style={{ width: "100%" }} placeholder="100" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Sotilgan soni" name="countSale">
              <InputNumber style={{ width: "100%" }} placeholder="90" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Turi" name="type" rules={[{ required: true }]}>
              <Select
                options={PRODUCT_TYPES}
                placeholder="Turini tanlang"
                defaultValue={"DEVICE"}
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}
