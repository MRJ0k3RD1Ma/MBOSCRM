import { Form, Input, Modal } from "antd";
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

export default function ClientTypeFormModal({
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
    } catch {
      // Error handled in query
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={create.isPending || update.isPending}
      title={selected ? "Tahrirlash" : "Yangi mijoz turi"}
      okText={selected ? "Saqlash" : "Qo‘shish"}
      cancelText="Bekor qilish"
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Turi nomi"
          rules={[{ required: true, message: "Iltimos, nomini kiriting" }]}
        >
          <Input placeholder="Masalan: Yuridik shaxs" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
