import { Drawer, Form, Input, Button } from "antd";
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

export default function ProductGroupFormDrawer({
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
    } catch {}
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={selected ? "Tahrirlash" : "Yangi mahsulot guruhi"}
      width={400}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Guruh nomi"
          rules={[{ required: true, message: "Iltimos, nomini kiriting" }]}
        >
          <Input placeholder="Masalan: Elektronika" />
        </Form.Item>
        <Button
          type="primary"
          block
          onClick={() => form.submit()}
          loading={create.isPending || update.isPending}
        >
          {selected ? "Saqlash" : "Qo‘shish"}
        </Button>
      </Form>
    </Drawer>
  );
}
