import { Form, InputNumber, Drawer, DatePicker, Select, Button } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";

type PaidSupplierFormValues = {
  supplierId: number;
  paidDate: string;
  price: number;
  paymentId: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: PaidSupplierFormValues) => void;
  initialValues?: PaidSupplierFormValues | null;
  suppliers: { id: number; name: string }[];
  payments: { id: number; name: string }[];
};

export default function PaidSupplierFormModal({
  open,
  onClose,
  onSubmit,
  initialValues,
  suppliers,
  payments,
}: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        paidDate: dayjs(initialValues.paidDate),
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = (values: any) => {
    const formattedValues: PaidSupplierFormValues = {
      ...values,
      paidDate: values.paidDate.format("YYYY-MM-DD"),
    };
    onSubmit(formattedValues);
    form.resetFields();
    onClose();
  };

  return (
    <Drawer
      title={initialValues ? "To‘lovni tahrirlash" : "Yangi to‘lov qo‘shish"}
      open={open}
      onClose={onClose}
      width={600}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
          }}
        >
          <Button onClick={onClose}>Bekor qilish</Button>
          <Button type="primary" onClick={() => form.submit()}>
            Saqlash
          </Button>
        </div>
      }
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <Form.Item
            label="Yetkazib beruvchi"
            name="supplierId"
            style={{ flex: 1, minWidth: 200 }}
            rules={[{ required: true, message: "Yetkazib beruvchini tanlang" }]}
          >
            <Select
              placeholder="Tanlang"
              options={suppliers.map((s) => ({
                label: s.name,
                value: s.id,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="To‘lov turi"
            name="paymentId"
            style={{ flex: 1, minWidth: 200 }}
            rules={[{ required: true, message: "To‘lov turini tanlang" }]}
          >
            <Select
              placeholder="To‘lov usuli"
              options={payments.map((p) => ({
                label: p.name,
                value: p.id,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="To‘langan summa"
            name="price"
            style={{ flex: 1, minWidth: 200 }}
            rules={[{ required: true, message: "To‘lov summasini kiriting" }]}
          >
            <InputNumber
              placeholder="0"
              style={{ width: "100%" }}
              min={0}
              step={1000}
            />
          </Form.Item>

          <Form.Item
            label="To‘lov sanasi"
            name="paidDate"
            style={{ flex: 1, minWidth: 200 }}
            rules={[{ required: true, message: "Sanani tanlang" }]}
          >
            <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
          </Form.Item>
        </div>
      </Form>
    </Drawer>
  );
}
