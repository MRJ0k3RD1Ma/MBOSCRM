import {
  Drawer,
  Form,
  InputNumber,
  Input,
  Space,
  Button,
  Divider,
  Select,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { Arrived } from "../../../config/queries/arrived/arrived-qureys";

type Props = {
  dataSource: Arrived[];
  open: boolean;
  onClose: () => void;
};

export default function ArrivedProductFormModal({
  dataSource,
  open,
  onClose,
}: Props) {
  const [form] = Form.useForm();
  const [arrivedList, setArrivedList] = useState<Arrived[]>([]);

  useEffect(() => {
    if (!open) {
      form.resetFields();
    } else {
      setArrivedList(dataSource);
    }
  }, [open]);

  const onFinish = (values: any) => {
    console.log("Yuborilgan qiymatlar:", values);
    onClose();
  };

  return (
    <Drawer
      title="Keltirilgan mahsulotlar"
      open={open}
      onClose={onClose}
      width={480}
      destroyOnClose
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        name="arrived_products"
      >
        <Form.Item
          name="arrivedId"
          label="Qaysi keltirilganga mahsulot qo‘shiladi?"
          rules={[{ required: true, message: "Arrived tanlang" }]}
        >
          <Select placeholder="Arrived tanlang">
            {arrivedList.map((arrived) => (
              <Select.Option key={arrived.id} value={arrived.id}>
                {arrived.description}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.List name="products">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "productName"]}
                    rules={[{ required: true, message: "Mahsulot nomi kerak" }]}
                  >
                    <Input placeholder="Mahsulot nomi" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "quantity"]}
                    rules={[{ required: true, message: "Soni kerak" }]}
                  >
                    <InputNumber placeholder="Soni" min={1} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "price"]}
                    rules={[{ required: true, message: "Narxi kerak" }]}
                  >
                    <InputNumber placeholder="Narxi" min={0} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  block
                >
                  Mahsulot qo‘shish
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Divider />

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Saqlash
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
