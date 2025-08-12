import { Drawer, Form, Input, Button } from "antd";
import { useEffect } from "react";
import {
  useCreatePaidOtherGroup,
  useUpdatePaidOtherGroup,
} from "../../../config/queries/paid/paid-other-group";

type Props = {
  open: boolean;
  onClose: () => void;
  selected: any;
};

export default function PaidOtherGroupFormDrawer({
  open,
  onClose,
  selected,
}: Props) {
  const [form] = Form.useForm();
  const create = useCreatePaidOtherGroup();
  const update = useUpdatePaidOtherGroup();

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
      title={selected ? "Tahrirlash" : "Yangi to‘lov guruhi"}
      width={400}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Turi nomi"
          rules={[{ required: true, message: "Iltimos, nomini kiriting" }]}
        >
          <Input placeholder="Masalan: Kameralar uchun to'lov guruhi" />
        </Form.Item>
        <Button
          type="primary"
          onClick={() => form.submit()}
          loading={create.isPending || update.isPending}
        >
          {selected ? "Saqlash" : "Qo‘shish"}
        </Button>
      </Form>
    </Drawer>
  );
}
