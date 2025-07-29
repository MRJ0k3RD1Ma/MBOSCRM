import { Form, Input, InputNumber, Modal, Select } from "antd";
import { useEffect } from "react";
import type { Product } from "../../../config/queries/products/products-querys"; // <--- To'g'ri import

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    values: Omit<
      Product,
      "id" | "isDeleted" | "createdAt" | "updatedAt" | "creatorId" | "modifyId"
    >
  ) => void;
  initialValues?: Product | null;
};

const PRODUCT_TYPES = [
  { label: "Qurilma", value: "DEVICE" },
  { label: "Xizmat", value: "SERVICE" },
];

export default function ProductFormModal({
  open,
  onClose,
  onSubmit,
  initialValues,
}: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      // undefined value larni nullga aylantirish
      const values = {
        ...initialValues,
        barcodeId: initialValues.barcodeId ?? null,
      };
      form.setFieldsValue(values);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      onClose();
    });
  };

  return (
    <Modal
      open={open}
      title={initialValues ? "Mahsulotni tahrirlash" : "Yangi mahsulot"}
      onCancel={onClose}
      onOk={handleOk}
      okText="Saqlash"
      cancelText="Bekor qilish"
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Nomi" name="name" rules={[{ required: true }]}>
          <Input placeholder="Mahsulot nomi" />
        </Form.Item>

        <Form.Item label="Shtrix kod" name="barcode">
          <Input placeholder="1234567890123" />
        </Form.Item>

        <Form.Item label="Shtrix ID" name="barcodeId">
          <InputNumber style={{ width: "100%" }} placeholder="Barcode ID" />
        </Form.Item>

        <Form.Item label="Guruh ID" name="groupId">
          <InputNumber style={{ width: "100%" }} placeholder="Group ID" />
        </Form.Item>

        <Form.Item label="O‘lchov birligi ID" name="unitId">
          <InputNumber style={{ width: "100%" }} placeholder="Unit ID" />
        </Form.Item>

        <Form.Item label="Kiruvchi narx" name="priceIncome">
          <InputNumber style={{ width: "100%" }} placeholder="5000" />
        </Form.Item>

        <Form.Item label="Boshlang‘ich qoldiq" name="reminderFirst">
          <InputNumber style={{ width: "100%" }} placeholder="50" />
        </Form.Item>

        <Form.Item label="Sotuv narxi" name="price">
          <InputNumber style={{ width: "100%" }} placeholder="10000" />
        </Form.Item>

        <Form.Item label="Turi" name="type" rules={[{ required: true }]}>
          <Select options={PRODUCT_TYPES} placeholder="Turini tanlang" />
        </Form.Item>

        <Form.Item label="Joriy qoldiq" name="countReminder">
          <InputNumber style={{ width: "100%" }} placeholder="10" />
        </Form.Item>

        <Form.Item label="Keltirilgan soni" name="countArrived">
          <InputNumber style={{ width: "100%" }} placeholder="100" />
        </Form.Item>

        <Form.Item label="Sotilgan soni" name="countSale">
          <InputNumber style={{ width: "100%" }} placeholder="90" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
