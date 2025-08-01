import { Form, Input, Modal } from "antd";
import { useEffect } from "react";
import {
  useCreateProductGroup,
  useUpdateProductGroup,
} from "../../../config/queries/products/product-gorup-querys";

type Props = {
  open: boolean;
  onClose: () => void;
  selected: any;
};

export default function ProductGroupFormModal({
  open,
  onClose,
  selected,
}: Props) {
  const [form] = Form.useForm();
  const create = useCreateProductGroup();
  const update = useUpdateProductGroup();

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
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={create.isPending || update.isPending}
      title={selected ? "Tahrirlash" : "Yangi mahsulot guruhi"}
      okText={selected ? "Saqlash" : "Qo‘shish"}
      cancelText="Bekor qilish"
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Guruh nomi"
          rules={[{ required: true, message: "Iltimos, nomini kiriting" }]}
        >
          <Input placeholder="Masalan: Elektronika" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
