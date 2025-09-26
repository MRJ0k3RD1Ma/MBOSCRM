import { Button, Card, Descriptions, Spin } from "antd";
import {
  useGetAppealById,
  useUpdateAppeal,
} from "../../config/queries/appeal/appeal-qurys";

import { useParams } from "react-router-dom";

export default function Appeal() {
  const { id } = useParams<{ id: string }>();
  const { data: appeal, isLoading } = useGetAppealById(Number(id));
  const updateAppeal = useUpdateAppeal();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spin size="large" />
      </div>
    );
  }

  if (!appeal) {
    return <p>Murojaat topilmadi</p>;
  }

  const handleUpdateState = () => {
    updateAppeal.mutate({
      id: appeal.id,
      state: appeal.state === "NEW" ? "RUNNING" : "COMPLETED",
    });
  };

  return (
    <Card title="Murojaat tafsilotlari">
      <div className="mb-6">
        {appeal.state === "NEW" && (
          <Button
            type="primary"
            onClick={handleUpdateState}
            loading={updateAppeal.isPending}
          >
            + Ishni boshlash
          </Button>
        )}
        {appeal.state === "RUNNING" && (
          <Button
            type="primary"
            danger
            onClick={handleUpdateState}
            loading={updateAppeal.isPending}
          >
            + Tugatish
          </Button>
        )}
      </div>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{appeal.id}</Descriptions.Item>
        <Descriptions.Item label="Ismi">{appeal.name}</Descriptions.Item>
        <Descriptions.Item label="Telefon raqami">
          {appeal.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Mavzu">{appeal.subject}</Descriptions.Item>
        <Descriptions.Item label="Tafsilot">{appeal.detail}</Descriptions.Item>
        <Descriptions.Item label="Holati">{appeal.state}</Descriptions.Item>
        <Descriptions.Item label="Yaratilgan sana">
          {new Date(appeal.createdAt).toLocaleString("uz-UZ")}
        </Descriptions.Item>
        <Descriptions.Item label="Yangilangan sana">
          {new Date(appeal.updatedAt).toLocaleString("uz-UZ")}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
