import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { useEffect, useState } from "react";

import type { CreateProductInput } from "../../../config/queries/products/products-querys";
import { useGetAllProductGroups } from "../../../config/queries/products/product-gorup-querys";
import { useGetAllProductUnits } from "../../../config/queries/products/product-unit-querys";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateProductInput) => void;
  initialValues?: Partial<CreateProductInput> | null;
}

export default function ProductsModal({
  open,
  onClose,
  onSubmit,
  initialValues,
}: Props) {
  const [form] = Form.useForm<CreateProductInput>();
  const [isReminderDisabled, setIsReminderDisabled] = useState(false);
  const { data: units } = useGetAllProductUnits();
  const { data: group } = useGetAllProductGroups();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      if (initialValues.type === "SUBSCRIPTION") {
        setIsReminderDisabled(true);
      }
    } else {
      form.resetFields();
      setIsReminderDisabled(false);
    }
  }, [initialValues, form]);

  const handleFinish = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch {}
  };

  return (
    <Drawer
      title={initialValues ? "Mahsulotni tahrirlash" : "Yangi mahsulot"}
      onClose={() => {
        form.resetFields();
        onClose();
      }}
      open={open}
      destroyOnClose
      width={720}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        onValuesChange={(changedValues) => {
          if (changedValues.type) {
            if (changedValues.type === "SUBSCRIPTION") {
              form.setFieldsValue({ reminderFirst: 0 });
              setIsReminderDisabled(true);
            } else {
              setIsReminderDisabled(false);
            }
          }
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Nomi"
              rules={[{ required: true, message: "Mahsulot nomini kiriting" }]}
            >
              <Input placeholder="Masalan: Apple Watch" className="!w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="barcode" label="Shtrix kod">
              <Input placeholder="1234567890123" className="!w-full" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="groupId"
              label="Guruh"
              rules={[{ required: true, message: "Guruh tanlang" }]}
            >
              <Select
                className="!w-full"
                placeholder="Guruh tanlang"
                showSearch
                optionFilterProp="label"
                options={group?.data.map((g) => ({
                  value: g.id,
                  label: g.name,
                }))}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="unitId"
              label="Birlik"
              rules={[{ required: true, message: "Birlik tanlang" }]}
            >
              <Select
                className="!w-full"
                placeholder="Birlik tanlang"
                showSearch
                optionFilterProp="label"
                options={units?.data.map((u) => ({
                  value: u.id,
                  label: u.name,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="priceIncome"
              label="Kelgan narxi"
              rules={[{ required: true, message: "Kelgan narxini kiriting" }]}
            >
              <InputNumber
                type="number"
                min={0}
                className="!w-full"
                placeholder="5000"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="reminderFirst"
              label="Dastlabki qoldiq"
              rules={[
                { required: true, message: "Dastlabki qoldiqni kiriting" },
              ]}
            >
              <InputNumber
                type="number"
                min={0}
                className="!w-full"
                placeholder="50"
                disabled={isReminderDisabled}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="price"
              label="Sotuv narxi"
              rules={[{ required: true, message: "Narxini kiriting" }]}
            >
              <InputNumber
                type="number"
                min={0}
                className="!w-full"
                placeholder="10000"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="type"
              label="Turi"
              rules={[{ required: true, message: "Mahsulot turini tanlang" }]}
            >
              <Select placeholder="Mahsulot turi">
                <Select.Option value="DEVICE">Qurilma</Select.Option>
                <Select.Option value="SERVICE">Xizmat</Select.Option>
                <Select.Option value="SUBSCRIPTION">Obuna</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="description" label="Izoh">
              <Input.TextArea rows={3} placeholder="Qo‘shimcha ma’lumot..." />
            </Form.Item>
          </Col>
        </Row>

        <Button type="primary" htmlType="submit" block>
          {initialValues ? "Saqlash" : "Qo‘shish"}
        </Button>
      </Form>
    </Drawer>
  );
}
