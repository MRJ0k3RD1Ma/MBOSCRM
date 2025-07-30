import { Modal, Form, DatePicker, Select } from "antd";
import dayjs from "dayjs";

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string | number>) => void;
  initialValues: Record<string, string | number>;
  suppliers: { id: number; name: string }[];
  payments: { id: number; name: string }[];
};

export default function PaidSupplierFilterModal({
  open,
  onClose,
  onApply,
  initialValues,
  suppliers,
  payments,
}: Props) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      const filters = {
        ...values,
        minPaidDate: values.minPaidDate
          ? dayjs(values.minPaidDate).format("YYYY-MM-DD")
          : undefined,
        maxPaidDate: values.maxPaidDate
          ? dayjs(values.maxPaidDate).format("YYYY-MM-DD")
          : undefined,
      };

      onApply(filters);
      onClose();
    });
  };

  const handleClear = () => {
    form.resetFields();
    onApply({});
    onClose();
  };

  return (
    <Modal
      title="To‘lovlar uchun filter"
      open={open}
      onOk={handleOk}
      onCancel={handleClear}
      okText="Qo‘llash"
      cancelText="Tozalash"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ...initialValues,
          minPaidDate: initialValues.minPaidDate
            ? dayjs(initialValues.minPaidDate)
            : null,
          maxPaidDate: initialValues.maxPaidDate
            ? dayjs(initialValues.maxPaidDate)
            : null,
        }}
      >
        <Form.Item label="Yetkazib beruvchi" name="supplierId">
          <Select
            placeholder="Tanlang"
            allowClear
            options={suppliers.map((s) => ({
              label: s.name,
              value: s.id,
            }))}
          />
        </Form.Item>

        <Form.Item label="To‘lov turi" name="paymentId">
          <Select
            placeholder="Tanlang"
            allowClear
            options={payments.map((p) => ({
              label: p.name,
              value: p.id,
            }))}
          />
        </Form.Item>

        <Form.Item label="Minimal to‘lov sanasi" name="minPaidDate">
          <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item label="Maksimal to‘lov sanasi" name="maxPaidDate">
          <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
