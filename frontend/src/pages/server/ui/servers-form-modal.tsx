import { Drawer, Form, Input, Button, DatePicker } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export interface CreateServerInput {
  name: string;
  ip: string;
  port: string;
  plan?: string;
  responsible?: string;
  description?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: any;
  initialValues?: any;
}

export default function ServerFormModal({
  open,
  onClose,
  onSubmit,
  initialValues,
}: Props) {
  const [form] = Form.useForm<any>();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        endDate: initialValues.endDate ? dayjs(initialValues.endDate) : null,
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = async () => {
    try {
      const values = await form.validateFields();
      if (values.endDate) {
        values.endDate = dayjs(values.endDate)
          .tz("Asia/Tashkent")
          .format("YYYY-MM-DD");
      }
      onSubmit(values);
      form.resetFields();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Drawer
      title={initialValues ? "Serverni tahrirlash" : "Yangi Server"}
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
          name="name"
          label="Server nomi"
          rules={[
            { required: true, message: "Iltimos, server nomini kiriting" },
          ]}
        >
          <Input placeholder="Server nomi" />
        </Form.Item>

        <Form.Item name="plan" label="Tarif reja">
          <Input placeholder="Masalan: Basic, Premium" />
        </Form.Item>

        <Form.Item name="responsible" label="Mas'ul shaxs">
          <Input placeholder="Mas'ul shaxs ismi" />
        </Form.Item>

        <Form.Item name="description" label="Izoh">
          <Input.TextArea rows={3} placeholder="Qo‘shimcha izoh..." />
        </Form.Item>

        <Form.Item
          name="endDate"
          label="Tugash sanasi"
          rules={[{ required: true, message: "Tugash sanasini tanlang" }]}
        >
          <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          {initialValues ? "Saqlash" : "Qo‘shish"}
        </Button>
      </Form>
    </Drawer>
  );
}
