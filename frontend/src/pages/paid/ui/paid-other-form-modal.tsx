import {
  Drawer,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Button,
} from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";
import type {
  PaidOtherDto,
  PaidOther,
} from "../../../config/queries/paid/paid-other";
import { useGetAllPaidOtherGroups } from "../../../config/queries/paid/paid-other-group";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useGetAllPayments } from "../../../config/queries/payment/payment-querys";

dayjs.extend(utc);
dayjs.extend(timezone);

const { Option } = Select;

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: PaidOtherDto) => void;
  initialValues?: PaidOther;
};

export default function PaidOtherFormDrawer({
  open,
  onClose,
  onSubmit,
  initialValues,
}: Props) {
  const [form] = Form.useForm();
  const { data } = useGetAllPaidOtherGroups();
  const { data: paymentData } = useGetAllPayments({ page: 1, limit: 1000 });

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        paidDate: initialValues.paidDate
          ? dayjs(initialValues.paidDate).startOf("day")
          : null,
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = (values: any) => {
    onSubmit({
      ...values,
      paidDate: values.paidDate
        ? values.paidDate.format("YYYY-MM-DD")
        : undefined,
    });
    form.resetFields();
  };

  return (
    <Drawer
      title={initialValues ? "Tahrirlash" : "Yangi boshqa to‘lov qo‘shish"}
      placement="right"
      width={480}
      onClose={onClose}
      open={open}
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
          label="Guruh"
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
        <Form.Item name="paymentId" label="To'lov turi">
          <Select
            placeholder="To'lov turini tanlang"
            showSearch
            allowClear
            optionFilterProp="label"
          >
            {paymentData?.data.map((p: { id: number; name: string }) => (
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
          <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item name="description" label="Izoh">
          <Input.TextArea rows={3} placeholder="Qo‘shimcha ma’lumot" />
        </Form.Item>
        <Button type="primary" onClick={() => form.submit()}>
          Saqlash
        </Button>
      </Form>
    </Drawer>
  );
}
