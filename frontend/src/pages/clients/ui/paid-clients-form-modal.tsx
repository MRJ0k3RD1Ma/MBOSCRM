import { Drawer, Form, Select, Button, InputNumber, DatePicker } from "antd";
import { useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import type { PaidClientDto } from "../../../config/queries/clients/paid-client-querys";

dayjs.extend(utc);
dayjs.extend(timezone);

type OptionType = { id: number; name: string; code?: string };

export interface PaidClientFormValues {
  clientId: number;
  saleId: number;
  paymentId: number;
  price: number;
  paidDate: Dayjs | null;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: PaidClientDto) => void;
  initialValues?: Partial<PaidClientDto> | null;
  clients: OptionType[];
  sales: any;
  payments: OptionType[];
  clientId: number | null;
  saleId: number | null | boolean;
}

export default function PaidClientFormModal({
  open,
  onClose,
  onSubmit,
  initialValues,
  clients,
  sales,
  payments,
  clientId,
  saleId,
}: Props) {
  const [form] = Form.useForm<PaidClientFormValues>();

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

  const handleFinish = async () => {
    try {
      const values = await form.validateFields();
      const payload: PaidClientDto = {
        ...values,
        paidDate: values.paidDate ? values.paidDate.format("YYYY-MM-DD") : "",
      };
      onSubmit(payload);
      form.resetFields();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Drawer
      title={initialValues ? "To‘lovni tahrirlash" : "Yangi to‘lov"}
      onClose={() => {
        form.resetFields();
        onClose();
      }}
      open={open}
      destroyOnClose
      width={400}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        {clientId ? (
          <Form.Item name="clientId" initialValue={clientId} hidden>
            <input type="hidden" />
          </Form.Item>
        ) : (
          <Form.Item
            name="clientId"
            label="Mijoz"
            rules={[{ required: true, message: "Iltimos mijozni tanlang" }]}
          >
            <Select
              placeholder="Mijozni tanlang"
              showSearch
              allowClear
              optionFilterProp="label"
            >
              {clients.map((client) => (
                <Select.Option
                  key={client.id}
                  value={client.id}
                  label={client.name}
                >
                  {client.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}

        {saleId === false ? null : saleId ? (
          <Form.Item name="saleId" initialValue={saleId} hidden>
            <input type="hidden" />
          </Form.Item>
        ) : (
          <Form.Item name="saleId" label="Savdo" hidden>
            <Select
              placeholder="Savdoni tanlang"
              showSearch
              optionFilterProp="label"
              allowClear
            >
              {sales.map((sale: any) => (
                <Select.Option
                  hidden
                  key={sale.id}
                  value={sale.id}
                  label={sale.code || `ID: ${sale.id}`}
                >
                  {sale.code || `ID: ${sale.id}`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item
          name="paymentId"
          label="To‘lov turi"
          rules={[{ required: true, message: "Iltimos to‘lov turini tanlang" }]}
        >
          <Select
            placeholder="To‘lov turini tanlang"
            showSearch
            optionFilterProp="label"
          >
            {payments.map((p) => (
              <Select.Option key={p.id} value={p.id} label={p.name}>
                {p.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="paidDate"
          label="To‘lov sanasi"
          rules={[{ required: true, message: "To‘lov sanasini tanlang" }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            placeholder="To‘lov sanasi"
            format="YYYY-MM-DD"
          />
        </Form.Item>

        <Form.Item
          name="price"
          label="To‘langan summa"
          rules={[{ required: true, message: "Summani kiriting" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} placeholder="0" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          {initialValues ? "Saqlash" : "Qo‘shish"}
        </Button>
      </Form>
    </Drawer>
  );
}
