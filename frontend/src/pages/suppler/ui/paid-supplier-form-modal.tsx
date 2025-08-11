import { Form, InputNumber, Drawer, DatePicker, Select, Button } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useThemeContext } from "../../../providers/theme-provider";

type PaidSupplierFormValues = {
  paidDate: string;
  price: number;
  paymentId: number;
  supplierId: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: PaidSupplierFormValues) => void;
  initialValues?: PaidSupplierFormValues | null;
  suppliers: { id: number; name: string }[];
  payments: { id: number; name: string }[];
  supplierId: number | null;
};

export default function PaidSupplierFormModal({
  open,
  onClose,
  onSubmit,
  initialValues,
  suppliers,
  payments,
  supplierId,
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
    if (values.paidDate) {
      values.paidDate = dayjs(values.paidDate)
        .tz("Asia/Tashkent")
        .format("YYYY-MM-DD");
    }
    const formattedValues: PaidSupplierFormValues = {
      ...values,
    };
    onSubmit(formattedValues);
    form.resetFields();
    onClose();
  };
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  return (
    <Drawer
      title={initialValues ? "To‘lovni tahrirlash" : "Yangi to‘lov qo‘shish"}
      open={open}
      onClose={onClose}
      width={400}
      bodyStyle={{
        background: isDark ? "#001529" : "#ffffff",
      }}
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
        {supplierId ? (
          <Form.Item name="supplierId" initialValue={supplierId} hidden>
            <input type="hidden" />
          </Form.Item>
        ) : (
          <Form.Item
            label="Yetkazib beruvchi"
            name="supplierId"
            style={{ flex: 1, minWidth: 200 }}
            rules={[{ required: true, message: "Yetkazib beruvchini tanlang" }]}
          >
            <Select
              placeholder="Tanlang"
              showSearch
              optionFilterProp="label"
              options={suppliers.map((s) => ({
                label: s.name,
                value: s.id,
              }))}
            />
          </Form.Item>
        )}

        <Form.Item
          label="To‘lov turi"
          name="paymentId"
          style={{ flex: 1, minWidth: 200 }}
          rules={[{ required: true, message: "To‘lov turini tanlang" }]}
        >
          <Select
            placeholder="To‘lov usuli"
            showSearch
            optionFilterProp="label"
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
      </Form>
    </Drawer>
  );
}
