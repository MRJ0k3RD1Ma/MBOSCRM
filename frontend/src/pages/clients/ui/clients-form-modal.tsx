import { Drawer, Form, Input, Select, Button } from "antd";
import { useEffect } from "react";
import type { CreateClientInput } from "../../../config/queries/clients/clients-querys";
import { useThemeContext } from "../../../providers/theme-provider";
import {
  useGetAllRegions,
  useGetDistrictsByRegion,
} from "../../../config/queries/location/location-querys";
import { useGetAllClientTypes } from "../../../config/queries/clients/client-type-querys";
import PhoneInput from "../../../components/form/phone-input";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateClientInput) => void;
  initialValues?: Partial<CreateClientInput> | null;
}

export default function ClientFormModal({
  open,
  onClose,
  onSubmit,
  initialValues,
}: Props) {
  const [form] = Form.useForm<CreateClientInput>();
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  const { data: types } = useGetAllClientTypes();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const regionId = Form.useWatch("regionId", form);

  const { data: regions } = useGetAllRegions();
  const { data: districts } = useGetDistrictsByRegion(regionId);

  const handleFinish = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch {}
  };

  return (
    <Drawer
      title={initialValues ? "Mijozni tahrirlash" : "Yangi Mijoz"}
      onClose={() => {
        form.resetFields();
        onClose();
      }}
      open={open}
      destroyOnClose
      width={400}
      bodyStyle={{
        background: isDark ? "#001529" : "#ffffff",
      }}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="Nomi"
          rules={[{ required: true, message: "Iltimos nomi kiriting" }]}
        >
          <Input placeholder="Mijoz nomi" />
        </Form.Item>

        <Form.Item
          name="inn"
          label="INN"
          rules={[{ required: true, message: "INN kiriting" }]}
        >
          <Input placeholder="123456789" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Telefon"
          rules={[
            { required: true, message: "Telefon raqam kiriting" },
            {
              pattern: /^\+998\d{9}$/,
              message: "Telefon raqam formati: +998XXXXXXXXX",
            },
          ]}
        >
          <PhoneInput />
        </Form.Item>
        <Form.Item
          name="typeId"
          label="Mijoz turi"
          rules={[{ required: true, message: "Mijoz turini tanlang" }]}
        >
          <Select
            placeholder="Mijoz turini tanlang"
            showSearch
            optionFilterProp="label"
          >
            {types?.data.map((type: any) => (
              <Select.Option key={type.id} value={type.id} label={type.name}>
                {type.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="regionId" label="Viloyat">
          <Select
            placeholder="Viloyatni tanlang"
            showSearch
            optionFilterProp="label"
          >
            {(regions ?? []).map((region) => (
              <Select.Option
                key={region.id}
                value={region.id}
                label={region.name}
              >
                {region.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="districtId" label="Tuman">
          <Select
            placeholder={
              regionId ? "Tumanni tanlang" : "Avval viloyatni tanlang"
            }
            showSearch
            optionFilterProp="label"
            disabled={!regionId}
          >
            {(districts ?? []).map((district) => (
              <Select.Option
                key={district.id}
                value={district.id}
                label={district.name}
              >
                {district.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="address" label="Manzil">
          <Input placeholder="Mijoz manzili" />
        </Form.Item>
        <Form.Item name="description" label="Izoh">
          <Input.TextArea rows={3} placeholder="Qo‘shimcha izoh..." />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          {initialValues ? "Saqlash" : "Qo‘shish"}
        </Button>
      </Form>
    </Drawer>
  );
}
