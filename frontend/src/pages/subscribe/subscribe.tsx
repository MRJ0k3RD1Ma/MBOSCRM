import { useParams } from "react-router-dom";
import { Card, Descriptions, Spin, Typography } from "antd";
import { useGetSubscribeById } from "../../config/queries/subscribe/subscribe-querys";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const { Title } = Typography;

export default function Subscribe() {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);

  const { data, isLoading, isError } = useGetSubscribeById(numericId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !data) {
    return <div>Xatolik yuz berdi yoki subscribe topilmadi.</div>;
  }

  const { client, sale } = data;

  const formatDate = (
    date: string | null | undefined,
    format = "YYYY-MM-DD HH:mm"
  ) => (date ? dayjs.utc(date).tz("Asia/Tashkent").format(format) : "-");

  return (
    <div className="p-6 space-y-6">
      <Title level={3}>Subscribe ID: {data.id}</Title>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Obuna ma'lumotlari" className="w-full">
          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label="To‘lov sanasi">
              {formatDate(data.paying_date)}
            </Descriptions.Item>
            <Descriptions.Item label="Narxi">{data.price}</Descriptions.Item>
            <Descriptions.Item label="To‘langan">{data.paid}</Descriptions.Item>
            <Descriptions.Item label="Holati">{data.state}</Descriptions.Item>
            <Descriptions.Item label="Yaratilgan">
              {formatDate(data.createdAt)}
            </Descriptions.Item>
            <Descriptions.Item label="Yangilangan">
              {formatDate(data.updatedAt)}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {client && (
          <Card title="Mijoz ma'lumotlari" className="w-full">
            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label="ID">{client.id}</Descriptions.Item>
              <Descriptions.Item label="Ism">{client.name}</Descriptions.Item>
              <Descriptions.Item label="INN">{client.inn}</Descriptions.Item>
              <Descriptions.Item label="Viloyat ID">
                {client.regionId}
              </Descriptions.Item>
              <Descriptions.Item label="Tuman ID">
                {client.districtId}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )}

        {sale && (
          <Card title="Sotuv ma'lumotlari" className="w-full">
            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label="ID">{sale.id}</Descriptions.Item>
              <Descriptions.Item label="Sana">
                {formatDate(sale.date, "YYYY-MM-DD")}
              </Descriptions.Item>
              <Descriptions.Item label="Code">{sale.code}</Descriptions.Item>
              <Descriptions.Item label="Narx">{sale.price}</Descriptions.Item>
              <Descriptions.Item label="Holat">{sale.state}</Descriptions.Item>
              <Descriptions.Item label="Obuna boshlangan sana">
                {formatDate(sale.subscribe_begin_date)}
              </Descriptions.Item>
              <Descriptions.Item label="Obuna har necha kunda yaratiladi">
                {sale.subscribe_generate_day}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )}
      </div>
    </div>
  );
}
