import { useParams } from "react-router-dom";
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
  Tabs,
  Card,
  Space,
  Descriptions,
  Modal,
  Popconfirm,
  message,
  Form,
} from "antd";
import {
  PhoneOutlined,
  EnvironmentOutlined,
  ApartmentOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { Title, Text } = Typography;

export default function ClientPage() {
  const { id } = useParams<{ id: string }>();
  const clientId = Number(id);
  const { data, isLoading, refetch } = useGetClientById(clientId);
  const updateClient = useUpdateClient();
  const deleteClient = useDeleteClient();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [form] = Form.useForm();

  const handleDelete = async () => {
    try {
      await deleteClient.mutateAsync(clientId);
      message.success("Client muvaffaqiyatli o‘chirildi");
      // optional: navigate to clients list page
      window.location.href = "/clients";
    } catch (error) {
      message.error("O‘chirishda xatolik yuz berdi");
    }
  };

  const handleEdit = () => {
    form.validateFields().then(async (values) => {
      try {
        await updateClient.mutateAsync({ id: clientId, ...values });
        message.success("Client yangilandi");
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
        <Title level={3}>Foydalanuvchi topilmadi</Title>
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
          <div className="">
            <div className="flex justify-center">
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center border">
                <UserOutlined style={{ fontSize: 30, color: "#aaa" }} />
              </div>
            </div>
            <Title level={4} className="!mb-0">
              {data.name}
            </Title>
          </div>

          <Descriptions column={1} className="mt-4 !h-full" size="small">
            <Descriptions.Item label="Telefon">
              <Space>
                <PhoneOutlined />
                {data.phone || "—"}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="INN">
              <Space>
                <ApartmentOutlined />
                {data.inn || "—"}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Manzil">
              <Space>
                <EnvironmentOutlined />
                {data.address || "—"}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Izoh">
              {data.description || "—"}
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
          <Tabs defaultActiveKey="overview" size="large">
            <Tabs.TabPane tab="Overview" key="overview">
              <div className="flex flex-wrap gap-4 mt-4">
                <Card size="small" className="flex-1 min-w-[200px]">
                  <Text>Total Orders</Text>
                  <Title level={4} className="!mt-1">
                    24
                  </Title>
                </Card>
                <Card size="small" className="flex-1 min-w-[200px]">
                  <Text>Total Spent</Text>
                  <Title level={4} className="!mt-1">
                    $12,450
                  </Title>
                </Card>
                <Card size="small" className="flex-1 min-w-[200px]">
                  <Text>Last Activity</Text>
                  <Title level={4} className="!mt-1">
                    2 days ago
                  </Title>
                </Card>
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Orders" key="orders">
              <p>Buyurtmalar ro‘yxati bu yerda...</p>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Payments" key="payments">
              <p>To‘lovlar bo‘limi...</p>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Activity" key="activity">
              <p>Faollik loglari...</p>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Settings" key="settings">
              <p>Sozlamalar bu yerda bo‘ladi...</p>
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </div>

      <Modal
        title="Client ma'lumotlarini tahrirlash"
        open={isEditOpen}
        onCancel={() => setIsEditOpen(false)}
        onOk={handleEdit}
        okText="Saqlash"
        cancelText="Bekor qilish"
        confirmLoading={updateClient.isPending}
      >
        {updateClient.isPending && <Spin />}
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Client name" />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="INN" name="inn">
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
