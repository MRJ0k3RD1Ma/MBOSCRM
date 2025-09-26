import { Button, Drawer, Form } from "antd";

interface Props {
  open: boolean;
  onClose: () => void;
}
export default function SimCardFromModal({ open, onClose }: Props) {
  const [form] = Form.useForm<any>();

  return (
    <Drawer
      title={"Yangi sim karta qo'shish"}
      onClose={() => {
        form.resetFields();
        onClose();
      }}
      open={open}
      destroyOnClose
      width={400}
    >
      <Form layout="vertical" form={form}>
        <h1>Hi</h1>
        <Button type="primary" htmlType="submit" block>
          Qo‘shish
        </Button>
      </Form>
    </Drawer>
  );
}
