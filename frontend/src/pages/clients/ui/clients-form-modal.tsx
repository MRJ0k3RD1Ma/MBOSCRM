import { Drawer, Form, Input, Select, Button } from "antd";
import { useEffect } from "react";
import type {
  ClientType,
  CreateClientInput,
} from "../../../config/queries/clients/clients-querys";
import { useThemeContext } from "../../../providers/theme-provider";
import {
  useGetAllRegions,
  useGetDistrictsByRegion,
} from "../../../config/queries/location/location-querys";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateClientInput) => void;
  initialValues?: Partial<CreateClientInput> | null;
  types: ClientType[];
}

export default function ClientModal({
  open,
  onClose,
  onSubmit,
  initialValues,
  types,
}: Props) {
  const [form] = Form.useForm<CreateClientInput>();
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

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
      title={initialValues ? "Clientni tahrirlash" : "Yangi Client"}
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
          label="Ismi"
          rules={[{ required: true, message: "Iltimos ismni kiriting" }]}
        >
          <Input placeholder="Client ismi" />
        </Form.Item>

        <Form.Item
          name="inn"
          label="INN"
          rules={[{ required: true, message: "INN kiriting" }]}
        >
          <Input placeholder="123456789" />
        </Form.Item>

        <Form.Item name="address" label="Manzil">
          <Input placeholder="Client manzili" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Telefon"
          rules={[{ required: true, message: "Telefon raqam kiriting" }]}
        >
          <Input placeholder="+998901234567" />
        </Form.Item>

        <Form.Item
          name="typeId"
          label="Client turi"
          rules={[{ required: true, message: "Client turini tanlang" }]}
        >
          <Select
            placeholder="Client turini tanlang"
            showSearch
            optionFilterProp="label"
          >
            {(types ?? []).map((type) => (
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
