import { Modal, Form, Input, InputNumber, DatePicker, Select } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";
import type {
  PaidOtherDto,
  PaidOther,
} from "../../../config/queries/paid/paid-other";
import { useGetAllPaidOtherGroups } from "../../../config/queries/paid/paid-other-group";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

const { Option } = Select;

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: PaidOtherDto) => void;
  initialValues?: PaidOther;
};

export default function PaidOtherFormModal({
  open,
  onClose,
  onSubmit,
  initialValues,
}: Props) {
  const [form] = Form.useForm();
  const { data } = useGetAllPaidOtherGroups();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        paidDate: initialValues.paidDate
          ? dayjs(initialValues.paidDate).tz("Asia/Tashkent")
          : undefined,
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = (values: any) => {
    onSubmit({
      ...values,
      paidDate: values.paidDate
        ? dayjs(values.paidDate).tz("Asia/Tashkent").format("YYYY-MM-DD")
        : undefined,
    });
    form.resetFields();
  };

  return (
    <Modal
      title={initialValues ? "Tahrirlash" : "Yangi boshqa to‘lov qo‘shish"}
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Saqlash"
      cancelText="Bekor qilish"
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ type: "OUTCOME" }}
      >
        <Form.Item
          name="groupId"
          label="Guruhn"
          rules={[{ required: true, message: "Guruhni tanlang" }]}
        >
          <Select
            placeholder="Guruhni tanlang"
            showSearch
            optionFilterProp="label"
          >
            {data?.data.map((p: any) => (
              <Select.Option key={p.id} value={p.id} label={p.name}>
                {p.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="type"
          label="Turi"
          rules={[{ required: true, message: "Turini tanlang" }]}
        >
          <Select>
            <Option value="INCOME">Kirim</Option>
            <Option value="OUTCOME">Chiqim</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="price"
          label="To‘lov miqdori"
          rules={[{ required: true, message: "Summani kiriting" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} placeholder="0" />
        </Form.Item>

        <Form.Item
          name="paidDate"
          label="To‘langan sana"
          rules={[{ required: true, message: "Sanani tanlang" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="description" label="Izoh">
          <Input.TextArea rows={3} placeholder="Qo‘shimcha ma’lumot" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
