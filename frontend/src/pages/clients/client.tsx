import { useParams, useNavigate } from "react-router-dom";
import {
  useGetClientById,
  useUpdateClient,
  useDeleteClient,
  useGetAllClients,
} from "../../config/queries/clients/clients-querys";
import {
  Button,
  Input,
  Spin,
  Typography,
  Card,
  Descriptions,
  Modal,
  Popconfirm,
  message,
  Form,
  Select,
  Tabs,
  type TabsProps,
  Table,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useGetAllClientTypes } from "../../config/queries/clients/client-type-querys";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  useGetAllRegions,
  useGetDistrictsByRegion,
} from "../../config/queries/location/location-querys";
import {
  useCreatePaidClient,
  useGetAllPaidClients,
  type PaidClientDto,
} from "../../config/queries/clients/paid-client-querys";
import { useGetAllSubscribes } from "../../config/queries/subscribe/subscribe-querys";
import { useGetAllSale } from "../../config/queries/sale/sale-querys";
import { useGetAllSaleProduct } from "../../config/queries/sale/sale-product-querys";
import PaidClientFormModal from "./ui/paid-clients-form-modal";
import { useGetAllPayments } from "../../config/queries/payment/payment-querys";

const { Title } = Typography;

export default function ClientPage() {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const clientId = Number(id);
  const regionId = Form.useWatch("regionId", form);
  const [paidOpen, setPaidOpen] = useState(false);
  const { data, isLoading, refetch } = useGetClientById(clientId);
  const { data: regions } = useGetAllRegions();
  const { data: districts } = useGetDistrictsByRegion(regionId);
  const createPaidClient = useCreatePaidClient();
  const updateClient = useUpdateClient();
  const deleteClient = useDeleteClient();
  const { data: clients } = useGetAllClients({ page: 1, limit: 1000 });
  const { data: sales } = useGetAllSale({ page: 1, limit: 1000 });
  const { data: payments } = useGetAllPayments({ page: 1, limit: 1000 });
  const { data: types } = useGetAllClientTypes();
  const { data: paidClient } = useGetAllPaidClients({ clientId });
  const { data: subscribeClient } = useGetAllSubscribes({
    clientId,
    state: "NOTPAYING",
  });
  const { data: allSubscribeClient } = useGetAllSubscribes({
    clientId,
  });
  const { data: salesClient } = useGetAllSale({
    clientId,
  });
  const { data: saleProductsClient } = useGetAllSaleProduct({
    clientId,
    isSubscribe: false,
  });
  console.log("salesClient", salesClient);
  console.log("saleProductsClient", saleProductsClient);

  const navigate = useNavigate();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const onSubmit = (values: PaidClientDto) => {
    createPaidClient.mutate(values);
    setPaidOpen(false);
  };

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

  const paidColumns = [
    {
      title: "Shartnoma raqami",
      dataIndex: ["sale", "code"],
      key: "checkNumber",
    },
    {
      title: "To’lov qilishi kerak bo’lgan sanasi",
      dataIndex: "paying_date",
      render: (text: string) =>
        text ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD") : "—",
    },
    {
      title: "Narxi",
      dataIndex: "price",
      key: "price",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "To’lagan summasi",
      dataIndex: "paid",
      key: "paidAmount",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "To’lov turi",
      dataIndex: ["sale", "PaidClient", "0", "Payment", "name"],
      key: "paymentType",
    },
    {
      title: "Yaratilgan vaqt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) =>
        text
          ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD HH:mm:ss")
          : "—",
    },
  ];

  const allSubscribeColumns = [
    {
      title: "Shartnoma raqami",
      dataIndex: ["sale", "code"],
      key: "checkNumber",
    },
    {
      title: "To’lov qilishi kerak bo’lgan sanasi",
      dataIndex: "paying_date",
      render: (text: string) =>
        text ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD") : "—",
    },
    {
      title: "Narxi",
      dataIndex: "price",
      key: "price",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "To’lagan summasi",
      dataIndex: "paid",
      key: "paidAmount",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "To’lov turi",
      dataIndex: ["sale", "PaidClient", "0", "Payment", "name"],
      key: "paymentType",
      render: (name: string) => (name ? name : "Balans"),
    },
    {
      title: "Yaratilgan vaqt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) =>
        text
          ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD HH:mm:ss")
          : "—",
    },
  ];

  const contractColumns = [
    {
      title: "Shartnoma raqami",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "To’ladi",
      dataIndex: "dept",
      render: (dept: number) =>
        dept ? dept.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "Narxi",
      dataIndex: "price",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    { title: "Qarzdorlik", dataIndex: "credit" },
    {
      title: "Obunami",
      dataIndex: ["SaleProduct", "0", "is_subscribe"],
      render: (is_subscribe: boolean) => (is_subscribe ? "Ha" : "Yo'q"),
    },
    {
      title: "Yaratilgan vaqt",
      dataIndex: "createdAt",
      render: (text: string) =>
        text
          ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD HH:mm:ss")
          : "—",
    },
  ];

  const paidByClientColumns = [
    {
      title: "To’lov sanasi",
      dataIndex: "paidDate",
      render: (text: string) =>
        text
          ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD HH:mm:ss")
          : "—",
    },
    {
      title: "Narxi",
      dataIndex: "price",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    { title: "To’lov turi", dataIndex: ["Payment", "name"] },
    {
      title: "Kiritilgan vaqti",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) =>
        text
          ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD HH:mm:ss")
          : "—",
    },
    { title: "Qabul qiluvchi", dataIndex: ["register", "name"] },
  ];

  const somxColumns = [
    {
      title: "Shartnoma raqami",
      dataIndex: ["sale", "code"],
      render: (code: number) => (code ? code : "-"),
    },
    {
      title: "Mahsulot nomi",
      dataIndex: ["product", "name"],
    },
    { title: "Narxi", dataIndex: "price" },
    {
      title: "Soni",
      dataIndex: "count",
      render: (_: any, record: any) => {
        const count = record.count || 0;
        const unitName = record.product?.ProductUnit?.name || "-";
        return `${count} ${unitName}`;
      },
    },
    {
      title: "Umumiy narxi ",
      dataIndex: "priceCount",
      render: (priceCount: number) =>
        priceCount ? priceCount.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "Kiritdi",
      dataIndex: ["register", "name"],
    },
  ];

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "To'lanmagan obunalar",
      children: (
        <Table
          columns={paidColumns}
          dataSource={subscribeClient?.data}
          pagination={false}
        />
      ),
    },
    {
      key: "2",
      label: "Obunalar",
      children: (
        <Table
          columns={allSubscribeColumns}
          dataSource={allSubscribeClient?.data}
          pagination={false}
        />
      ),
    },
    {
      key: "3",
      label: "Shartnomalar",
      children: (
        <Table
          columns={contractColumns}
          dataSource={salesClient?.data}
          pagination={false}
        />
      ),
    },
    {
      key: "4",
      label: "To'lovlar",
      children: (
        <Table
          columns={paidByClientColumns}
          dataSource={paidClient}
          pagination={false}
        />
      ),
    },
    {
      key: "5",
      label: "Sotilgan mahsulotlar",
      children: (
        <Table
          columns={somxColumns}
          dataSource={saleProductsClient?.data}
          pagination={false}
        />
      ),
    },
  ];
  dayjs.extend(utc);
  dayjs.extend(timezone);

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <Card style={{ flex: 1, maxWidth: 480 }}>
        <Space direction="vertical" className="mb-4">
          <Title className="!text-[17px]">Mahsulot haqida ma’lumotlar</Title>
          <Space>
            <Button
              onClick={() => {
                form.setFieldsValue(data);
                setIsEditOpen(true);
              }}
              style={{ marginRight: 8 }}
            >
              O‘zgartirish
            </Button>
            <Popconfirm
              title="Haqiqatan o‘chirmoqchimisiz?"
              onConfirm={handleDelete}
            >
              <Button danger>O‘chirish</Button>
            </Popconfirm>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setPaidOpen(true);
              }}
            >
              Yangi to‘lov qo‘shish
            </Button>
          </Space>
        </Space>
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="Ismi">{data.name || "—"}</Descriptions.Item>
          <Descriptions.Item label="INN">{data.inn || "—"}</Descriptions.Item>
          <Descriptions.Item label="Telefon">
            {data.phone || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Balans">
            {data.balance || "0"}
          </Descriptions.Item>
          <Descriptions.Item label="Manzil">
            {data.address || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Viloyat">
            {data.Region.name || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Tuman">
            {data.District.name || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Tavsif">
            {data.description || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Mijoz turi">
            {types?.data.find((t) => t.id === data.typeId)?.name || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Yaratilgan">
            {data.createdAt
              ? dayjs(data.createdAt)
                  .tz("Asia/Tashkent")
                  .format("YYYY-MM-DD HH:mm:ss")
              : "Noma'lum"}
          </Descriptions.Item>
          <Descriptions.Item label="O'zgartirilgan">
            {data.updatedAt
              ? dayjs(data.updatedAt)
                  .tz("Asia/Tashkent")
                  .format("YYYY-MM-DD HH:mm:ss")
              : "Noma'lum"}
          </Descriptions.Item>
          <Descriptions.Item label="Kiritdi">
            {data.registerId || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="O’zgartirdi">
            {data.modifyId || "—"}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card style={{ flex: 2 }} title="Mahsulotning qo‘shimcha ma’lumotlari">
        <Tabs defaultActiveKey="1" items={tabItems} />
      </Card>
      
      <PaidClientFormModal
        open={paidOpen}
        onClose={() => {
          setPaidOpen(false);
        }}
        onSubmit={onSubmit}
        clients={clients?.data || []}
        sales={sales?.data || []}
        payments={payments?.data || []}
        clientId={clientId}
      />
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
          <Form.Item
            label="Nomi"
            name="name"
            rules={[
              { required: true, message: "Iltimos, mijoz ismini kiriting" },
            ]}
          >
            <Input placeholder="Mijoz ismi" />
          </Form.Item>

          <Form.Item label="INN" name="inn">
            <Input placeholder="INN raqami" />
          </Form.Item>

          <Form.Item label="Telefon" name="phone">
            <Input placeholder="+998901234567" />
          </Form.Item>

          <Form.Item label="Manzil" name="address">
            <Input placeholder="Mijoz manzili" />
          </Form.Item>

          <Form.Item
            name="regionId"
            label="Viloyat"
            rules={[{ required: true, message: "Viloyatni tanlang" }]}
          >
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

          <Form.Item
            name="districtId"
            label="Tuman"
            rules={[{ required: true, message: "Tumanni tanlang" }]}
          >
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

          <Form.Item label="Tavsif" name="description">
            <Input.TextArea rows={3} placeholder="Izoh" />
          </Form.Item>

          <Form.Item
            label="Turi"
            name="typeId"
            rules={[{ required: true, message: "Mijoz turini tanlang" }]}
          >
            <Select
              placeholder="Mijoz turini tanlang"
              showSearch
              optionFilterProp="label"
            >
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
