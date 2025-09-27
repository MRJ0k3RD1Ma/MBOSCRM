import { Card, Descriptions, Spin } from "antd";

import dayjs from "dayjs";
import { useGetAllClients } from "../../config/queries/clients/clients-querys";
import { useGetSimCardById } from "../../config/queries/simcard/simcard-querys";
import { useParams } from "react-router-dom";

export default function SimCardDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetSimCardById(Number(id));
  const { data: clients } = useGetAllClients({ page: 1, limit: 1000 });

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (!data) {
    return <div>Ma’lumot topilmadi</div>;
  }

  return (
    <Card title={`Sim karta #${data.id}`} bordered>
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Mijoz ID">
          {clients?.data.find((u: any) => u.id === data.clientId)?.name || "–"}
        </Descriptions.Item>
        <Descriptions.Item label="Kompaniya">{data.company}</Descriptions.Item>
        <Descriptions.Item label="Raqam">{data.phoneNumber}</Descriptions.Item>
        <Descriptions.Item label="Izoh">
          {data.description || "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Holati">
          <span
            style={{
              padding: "2px 8px",
              borderRadius: 6,
              fontWeight: 500,
              backgroundColor: data.isActive ? "#4CAF50" : "#F44336",
              color: "#fff",
            }}
          >
            {data.isActive ? "Active" : "Inactive"}
          </span>
        </Descriptions.Item>
        <Descriptions.Item label="Aktiv qilingan sana">
          {data.activeDate ? dayjs(data.activeDate).format("YYYY-MM-DD") : "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Yaratilgan vaqt">
          {dayjs(data.createdAt).format("YYYY-MM-DD HH:mm")}
        </Descriptions.Item>
        <Descriptions.Item label="Yangilangan vaqt">
          {dayjs(data.updatedAt).format("YYYY-MM-DD HH:mm")}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
