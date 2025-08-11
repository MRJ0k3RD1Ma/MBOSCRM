import { Button, Card, Descriptions, message, Popconfirm, Space } from "antd";
import Title from "antd/es/typography/Title";
import { PlusOutlined } from "@ant-design/icons";
import { useDeleteClient } from "../../../config/queries/clients/clients-querys";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useGetAllClientTypes } from "../../../config/queries/clients/client-type-querys";
import type { Dispatch, SetStateAction } from "react";

export default function ClientInfos({
  clientId,
  data,
  form,
  setIsEditOpen,
  setPaidOpen,
}: {
  clientId: number;
  data: any;
  form: any;
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
  setPaidOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();

  const { data: types } = useGetAllClientTypes();
  const deleteClient = useDeleteClient();

  const handleDelete = async () => {
    try {
      await deleteClient.mutateAsync(clientId);
      message.success("Mijoz muvaffaqiyatli o‘chirildi");
      navigate("/clients");
    } catch (error) {
      message.error("O‘chirishda xatolik yuz berdi");
    }
  };

  return (
    <Card style={{ flex: 1, maxWidth: 480 }}>
      <Space direction="vertical" className="mb-4">
        <Title className="!text-[17px]">Mijoz haqida ma’lumotlar</Title>
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
          {data?.phone || "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Balans">
          {data?.balance ? data.balance.toLocaleString("uz-UZ") + " so'm" : "0"}
        </Descriptions.Item>
        <Descriptions.Item label="Manzil">
          {data?.address || "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Viloyat">
          {data?.Region?.name || "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Tuman">
          {data?.District?.name || "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Tavsif">
          {data?.description || "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Mijoz turi">
          {types?.data.find((t) => t.id === data.typeId)?.name || "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Yaratilgan">
          {data?.createdAt
            ? dayjs(data.createdAt)
                .tz("Asia/Tashkent")
                .format("YYYY-MM-DD HH:mm:ss")
            : "Noma'lum"}
        </Descriptions.Item>
        <Descriptions.Item label="O'zgartirilgan">
          {data?.updatedAt
            ? dayjs(data.updatedAt)
                .tz("Asia/Tashkent")
                .format("YYYY-MM-DD HH:mm:ss")
            : "Noma'lum"}
        </Descriptions.Item>
        <Descriptions.Item label="Kiritdi">
          {data?.registerId || "—"}
        </Descriptions.Item>
        <Descriptions.Item label="O’zgartirdi">
          {data?.modifyId || "—"}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
