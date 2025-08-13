import { Drawer, Form, Input, Button } from "antd";
import { useEffect } from "react";
import {
  useCreateClientType,
  useUpdateClientType,
} from "../../../config/queries/clients/client-type-querys";

type Props = {
  open: boolean;
  onClose: () => void;
  selected: any;
};

export default function ClientTypeFormDrawer({
  open,
  onClose,
  selected,
}: Props) {
  const [form] = Form.useForm();
  const create = useCreateClientType();
  const update = useUpdateClientType();

  useEffect(() => {
    if (selected) {
      form.setFieldsValue({ name: selected.name });
    } else {
      form.resetFields();
    }
  }, [selected, form]);

  const onFinish = async (values: { name: string }) => {
    try {
      if (selected) {
        await update.mutateAsync({ id: selected.id, name: values.name });
      } else {
        await create.mutateAsync({ name: values.name });
      }
      onClose();
      form.resetFields();
    } catch {}
  };

  return (
    <Drawer
      title={selected ? "Tahrirlash" : "Yangi mijoz turi"}
      placement="right"
      width={400}
      onClose={onClose}
      open={open}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Turi nomi"
          rules={[{ required: true, message: "Iltimos, nomini kiriting" }]}
        >
          <Input placeholder="Masalan: Yuridik shaxs" />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={create.isPending || update.isPending}
        >
          {selected ? "Saqlash" : "Qo‘shish"}
        </Button>
      </Form>
    </Drawer>
  );
}
