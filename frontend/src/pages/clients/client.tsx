import { useParams } from "react-router-dom";
import {
  useGetProductById,
  useUpdateProduct,
  useDeleteProduct,
} from "../../config/queries/products/products-querys";
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
  InputNumber,
  Select,
} from "antd";
import {
  BarcodeOutlined,
  DollarOutlined,
  DatabaseOutlined,
  EditOutlined,
  DeleteOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { Title, Text } = Typography;

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const { data, isLoading, refetch } = useGetProductById(productId);
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [form] = Form.useForm();

  const handleDelete = async () => {
    try {
      await deleteProduct.mutateAsync(productId);
      message.success("Mahsulot muvaffaqiyatli o‘chirildi");
      window.location.href = "/products";
    } catch (error) {
      message.error("O‘chirishda xatolik yuz berdi");
    }
  };

  const handleEdit = () => {
    form.validateFields().then(async (values) => {
      try {
        await updateProduct.mutateAsync({ id: productId, ...values });
        message.success("Mahsulot yangilandi");
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
        <Title level={3}>Mahsulot topilmadi</Title>
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
                <TagsOutlined style={{ fontSize: 30, color: "#aaa" }} />
              </div>
            </div>
            <Title level={4} className="!mb-0">
              {data.name}
            </Title>
          </div>

          <Descriptions column={1} className="!mt-6 !h-full" size="small">
            <Descriptions.Item label="Shtrix-kod">
              <Space>
                <BarcodeOutlined />
                {data.barcode || "—"}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Narx (kelgan)">
              <Space>
                <DollarOutlined />
                {data.priceIncome || "—"}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Narx (sotuv)">
              <Space>
                <DollarOutlined />
                {data.price || "—"}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Qolgan miqdor">
              <Space>
                <DatabaseOutlined />
                {data.countReminder || "—"}
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
          <Tabs defaultActiveKey="overview" size="large">
            <Tabs.TabPane tab="Overview" key="overview">
              <div className="flex flex-wrap gap-4 mt-4">
                <Card size="small" className="flex-1 min-w-[200px]">
                  <Text>Kelgan</Text>
                  <Title level={4}>{data.countArrived}</Title>
                </Card>
                <Card size="small" className="flex-1 min-w-[200px]">
                  <Text>Sotilgan</Text>
                  <Title level={4}>{data.countSale}</Title>
                </Card>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </div>

      <Modal
        title="Mahsulot ma'lumotlarini tahrirlash"
        open={isEditOpen}
        onCancel={() => setIsEditOpen(false)}
        onOk={handleEdit}
        okText="Saqlash"
        cancelText="Bekor qilish"
        confirmLoading={updateProduct.isPending}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Nomi" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Shtrix-kod" name="barcode">
            <Input />
          </Form.Item>
          <Form.Item label="Narx (kelgan)" name="priceIncome">
            <InputNumber className="w-full" />
          </Form.Item>
          <Form.Item label="Narx (sotuv)" name="price">
            <InputNumber className="w-full" />
          </Form.Item>
          <Form.Item label="Qolgan miqdor" name="countReminder">
            <InputNumber className="w-full" />
          </Form.Item>
          <Form.Item label="Kelgan soni" name="countArrived">
            <InputNumber className="w-full" />
          </Form.Item>
          <Form.Item label="Sotilgan soni" name="countSale">
            <InputNumber className="w-full" />
          </Form.Item>
          <Form.Item label="Turi" name="type">
            <Select
              options={[
                { label: "DEVICE", value: "DEVICE" },
                { label: "SERVICE", value: "SERVICE" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
