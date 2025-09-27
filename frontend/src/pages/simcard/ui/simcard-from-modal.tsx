import { Button, DatePicker, Drawer, Form, Input, Select, Switch } from "antd";
import type {
  CreateSimCardInput,
  SimCard,
} from "../../../config/queries/simcard/simcard-querys";

import PhoneInput from "../../../components/form/phone-input";
import React from "react";
import dayjs from "dayjs";

interface Props {
  open: boolean;
  onClose: () => void;
  clients: any;
  onSubmit: (values: CreateSimCardInput) => void;
  initialValues?: SimCard | null;
}

const { Option } = Select;

export default function SimCardFormModal({
  open,
  onClose,
  clients,
  onSubmit,
  initialValues,
}: Props) {
  const [form] = Form.useForm<CreateSimCardInput>();

  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        activeDate: initialValues.activeDate
          ? dayjs(initialValues.activeDate)
          : null,
      });
    } else {
      form.resetFields();
      form.setFieldsValue({ isActive: true });
    }
  }, [initialValues, form]);

  const handleFinish = async () => {
    try {
      const values = await form.validateFields();
      onSubmit({
        ...values,
        clientId: Number(values.clientId),
        activeDate: values.activeDate
          ? dayjs.isDayjs(values.activeDate)
            ? values.activeDate.toISOString()
            : values.activeDate
          : undefined,
      });
      onClose();
    } catch {}
  };

  return (
    <Drawer
      title={initialValues ? "Sim kartani tahrirlash" : "Yangi sim karta"}
      onClose={() => {
        form.resetFields();
        onClose();
      }}
      open={open}
      destroyOnClose
      width={400}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          label="Mijoz"
          name="clientId"
          rules={[{ required: true, message: "Mijozni tanlang" }]}
        >
          <Select
            placeholder="Mijozni tanlang"
            showSearch
            optionFilterProp="label"
          >
            {clients?.data.map((client: any) => (
              <Option key={client.id} value={client.id} label={client.name}>
                {client.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Kompaniya"
          name="company"
          rules={[{ required: true, message: "Kompaniya kiriting" }]}
        >
          <Input placeholder="Sim karta kompaniyasi" />
        </Form.Item>

        <Form.Item
          label="Telefon raqami"
          name="phoneNumber"
          rules={[{ required: true, message: "Telefon raqami kiriting" }]}
        >
          <PhoneInput />
        </Form.Item>

        <Form.Item label="Izoh" name="description">
          <Input.TextArea rows={3} placeholder="Qo‘shimcha izoh..." />
        </Form.Item>

        <Form.Item
          label="Holati"
          name="isActive"
          valuePropName="checked"
          rules={[{ required: true, message: "Holatni belgilang" }]}
        >
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>

        <Form.Item
          label="Aktiv qilingan sana"
          name="activeDate"
          rules={[{ required: true, message: "Sanani tanlang" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          {initialValues ? "Saqlash" : "Qo‘shish"}
        </Button>
      </Form>
    </Drawer>
  );
}
