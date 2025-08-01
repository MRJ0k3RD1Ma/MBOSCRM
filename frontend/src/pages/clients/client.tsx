import { useParams, useNavigate } from "react-router-dom";
import {
  useGetClientById,
  useUpdateClient,
  useDeleteClient,
} from "../../config/queries/clients/clients-querys";
import {
  Button,
  Input,
  Spin,
  Typography,
  Card,
  Space,
  Descriptions,
  Modal,
  Popconfirm,
  message,
  Form,
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
  NumberOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useGetAllClientTypes } from "../../config/queries/clients/client-type-querys";

const { Title } = Typography;

export default function ClientPage() {
  const { id } = useParams<{ id: string }>();
  const clientId = Number(id);
  const { data, isLoading, refetch } = useGetClientById(clientId);
  const updateClient = useUpdateClient();
  const deleteClient = useDeleteClient();
  const { data: types } = useGetAllClientTypes();
  const navigate = useNavigate();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [form] = Form.useForm();

  const handleDelete = async () => {
    try {
      await deleteClient.mutateAsync(clientId);
      message.success("Mijoz muvaffaqiyatli o‘chirildi");
      navigate("/clients");
    } catch (error) {
      message.error("O‘chirishda xatolik yuz berdi");
    }
  };

  const handleEdit = () => {
    form.validateFields().then(async (values) => {
      try {
        await updateClient.mutateAsync({ id: clientId, ...values });
        message.success("Mijoz yangilandi");
        setIsEditOpen(false);
        refetch();
      } catch (error) {
        message.error("Yangilashda xatolik yuz berdi");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Spin size="large" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center mt-20">
        <Title level={3}>Mijoz topilmadi</Title>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="flex justify-between items-start gap-3 h-full">
        <Card
          bordered
          className="flex flex-col justify-between text-center shadow-md w-[40%] !h-full"
        >
          <div>
            <div className="flex justify-center">
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center border">
                <UserOutlined style={{ fontSize: 30, color: "#aaa" }} />
              </div>
            </div>
            <Title level={4} className="!mb-0">
              {data.name}
            </Title>
          </div>

          <Descriptions column={1} className="!mt-6 !h-full" size="small">
            <Descriptions.Item label="INN">
              <Space>
                <NumberOutlined />
                {data.inn || "—"}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Telefon">
              <Space>
                <PhoneOutlined />
                {data.phone || "—"}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Manzil">
              <Space>
                <EnvironmentOutlined />
                {data.address || "—"}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Tavsif">
              <Space>
                <InfoCircleOutlined />
                {data.description || "—"}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Mijoz turi">
              <Space>
                <ApartmentOutlined />
                {types?.data.find((t) => t.id === data.typeId)?.name || "—"}
              </Space>
            </Descriptions.Item>
          </Descriptions>

          <Space direction="vertical" className="w-full pt-4">
            <Button
              icon={<EditOutlined />}
              block
              onClick={() => {
                form.setFieldsValue(data);
                setIsEditOpen(true);
              }}
            >
              Tahrirlash
            </Button>
            <Popconfirm
              title="Haqiqatan ham o‘chirmoqchimisiz?"
              okText="Ha"
              cancelText="Yo‘q"
              onConfirm={handleDelete}
            >
              <Button icon={<DeleteOutlined />} danger block>
                O‘chirish
              </Button>
            </Popconfirm>
          </Space>
        </Card>

        <Card bordered className="w-[60%] h-full">
          <Title level={5}>Qo‘shimcha ma'lumotlar hozircha yo‘q</Title>
        </Card>
      </div>

      <Modal
        title="Mijoz ma'lumotlarini tahrirlash"
        open={isEditOpen}
        onCancel={() => setIsEditOpen(false)}
        onOk={handleEdit}
        okText="Saqlash"
        cancelText="Bekor qilish"
        confirmLoading={updateClient.isPending}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Nomi" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="INN" name="inn">
            <Input />
          </Form.Item>
          <Form.Item label="Telefon" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Manzil" name="address">
            <Input />
          </Form.Item>
          <Form.Item label="Tavsif" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item label="Turi" name="typeId">
            <Select showSearch optionFilterProp="label">
              {types?.data.map((type) => (
                <Select.Option key={type.id} value={type.id} label={type.name}>
                  {type.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
