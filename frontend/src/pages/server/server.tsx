import {
  Button,
  Card,
  Descriptions,
  Space,
  Table,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useState } from "react";

import {
  useDeleteServer,
  useGetServerById,
  useUpdateServer,
} from "../../config/queries/server/servers-querys";
import {
  useCreatePaidServer,
  useGetAllPaidServers,
} from "../../config/queries/server/paid-servers-querys";
import { useGetAllPayments } from "../../config/queries/payment/payment-querys";
import { indexColumn } from "../../components/tables/indexColumn";

export default function Server() {
  const { id } = useParams();
  const navigate = useNavigate();
  const serverId = Number(id);
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data: server } = useGetServerById(serverId);
  const { data: paidServers, isLoading: isPaidLoading } = useGetAllPaidServers({
    serverId,
    page,
    limit,
  });

  const deleteMutation = useDeleteServer();
  const updateMutation = useUpdateServer();
  const createPaidServerMutation = useCreatePaidServer();
  const { data: payments } = useGetAllPayments({ page: 1, limit: 1000 });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [paymentForm] = Form.useForm();

  const handleDelete = () => {
    deleteMutation.mutate(serverId, {
      onSuccess: () => {
        message.success("Server o‘chirildi");
        navigate("/servers");
      },
    });
  };

  const handlePayment = () => {
    setIsPaymentModalOpen(true);
    paymentForm.resetFields();
    paymentForm.setFieldsValue({
      serverId,
      endDate: dayjs(),
    });
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
    form.setFieldsValue({
      name: server?.name,
      responsible: server?.responsible,
      plan: server?.plan,
      endDate: server?.endDate
        ? dayjs(server.endDate).tz("Asia/Tashkent").format("YYYY-MM-DD")
        : null,
    });
  };

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      updateMutation.mutate(
        {
          ...values,
          id: serverId,
          endDate: values.endDate.format("YYYY-MM-DD").tz("Asia/Tashkent"),
        },
        {
          onSuccess: () => {
            message.success("Server yangilandi");
            setIsEditModalOpen(false);
          },
        }
      );
    } catch (error) {
      console.error("Validation error", error);
    }
  };

  const handlePaymentSubmit = async () => {
    try {
      const values = await paymentForm.validateFields();
      createPaidServerMutation.mutate(
        {
          ...values,
          endDate: dayjs(values.endDate)
            .tz("Asia/Tashkent")
            .format("YYYY-MM-DD"),
          serverId,
          price: +values.price,
        },
        {
          onSuccess: () => setIsPaymentModalOpen(false),
        }
      );
    } catch (error) {
      console.error("Validation error", error);
    }
  };

  const columns = [
    indexColumn(page, limit),
    {
      title: "To'lov turi",
      dataIndex: ["paymentType", "name"],
    },
    {
      title: "Narxi",
      dataIndex: "price",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "Sanasi",
      dataIndex: "createdAt",
      render: (text: string) =>
        text ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD") : "—",
    },
    {
      title: "Izoh",
      dataIndex: "description",
    },
  ];

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <Card title="Server haqida ma'lumot" style={{ flex: 1, maxWidth: 480 }}>
        <Descriptions column={1} size="small" bordered>
          <Descriptions.Item label="Nomi">{server?.name}</Descriptions.Item>
          <Descriptions.Item label="Mas'ul">
            {server?.responsible}
          </Descriptions.Item>
          <Descriptions.Item label="Holati">{server?.state}</Descriptions.Item>
          <Descriptions.Item label="Tarif">{server?.plan}</Descriptions.Item>
          <Descriptions.Item label="Tugash sanasi">
            {server?.endDate && dayjs(server.endDate).format("YYYY-MM-DD")}
          </Descriptions.Item>
          <Descriptions.Item label="Tugash kuni">
            {server?.daysLeft}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card
        style={{ flex: 2 }}
        title="Serverning qo‘shimcha ma’lumotlari"
        extra={
          <Space>
            <Button onClick={handleEdit}>O'zgartirish</Button>
            <Popconfirm
              title="Serverni o‘chirishga ishonchingiz komilmi?"
              onConfirm={handleDelete}
            >
              <Button danger>O'chirish</Button>
            </Popconfirm>
            <Button type="primary" onClick={handlePayment}>
              To'lov qilish
            </Button>
          </Space>
        }
      >
        <Table
          loading={isPaidLoading}
          dataSource={paidServers}
          rowKey="id"
          pagination={{
            current: page,
            pageSize: limit,
            total: paidServers?.length,
            onChange: setPage,
          }}
          columns={columns}
        />
      </Card>

      <Modal
        title="Serverni tahrirlash"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onOk={handleEditSubmit}
        okText="Saqlash"
        cancelText="Bekor qilish"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Server nomi"
            name="name"
            rules={[{ required: true, message: "Server nomini kiriting" }]}
          >
            <Input placeholder="Server nomi" />
          </Form.Item>

          <Form.Item label="Mas'ul" name="responsible">
            <Input placeholder="Mas'ul shaxs" />
          </Form.Item>

          <Form.Item label="Tarif" name="plan">
            <Input placeholder="Tarif nomi" />
          </Form.Item>

          <Form.Item
            label="Tugash sanasi"
            name="endDate"
            rules={[{ required: true, message: "Tugash sanasini kiriting" }]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="To‘lov qilish"
        open={isPaymentModalOpen}
        onCancel={() => setIsPaymentModalOpen(false)}
        onOk={handlePaymentSubmit}
        okText="Qo‘shish"
        cancelText="Bekor qilish"
      >
        <Form layout="vertical" form={paymentForm}>
          <Form.Item
            label="To‘lov turi "
            name="paymentTypeId"
            rules={[{ required: true, message: "To‘lov turi  ni kiriting" }]}
          >
            <Select
              placeholder="To‘lovni tanlang"
              showSearch
              optionFilterProp="label"
            >
              {payments?.data.map((p) => (
                <Select.Option key={p.id} value={p.id} label={p.name}>
                  {p.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Narxi"
            name="price"
            rules={[{ required: true, message: "Narxni kiriting" }]}
          >
            <Input type="number" placeholder="Narx" />
          </Form.Item>

          <Form.Item label="Izoh" name="description">
            <Input placeholder="Izoh" />
          </Form.Item>

          <Form.Item
            label="Tugash sanasi"
            name="endDate"
            rules={[{ required: true, message: "Tugash sanasini kiriting" }]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
