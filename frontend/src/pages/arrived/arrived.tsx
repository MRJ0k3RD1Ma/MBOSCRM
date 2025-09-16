import { Button, Card, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ArrivedPageInfos from "./ui/arrived-page-infos";
import ArrivedPageTable from "./ui/arrived-page-table";
import { useDeleteArrived } from "../../config/queries/arrived/arrived-qureys";

const { Title } = Typography;

export default function Arrived() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState<number | null>(null);

  useEffect(() => {
    if (id) setCurrentId(Number(id));
  }, [id]);

  const deleteArrived = useDeleteArrived();
  const handleDelete = () => {
    if (!currentId) return;
    deleteArrived.mutate(currentId, {
      onSuccess: () => {
        navigate("/arrived");
      },
    });
  };

  return (
    <Card>
      <Row
        justify="space-between"
        align="middle"
        style={{
          marginBottom: 24,
          borderBottom: "1px solid #303030",
          paddingBottom: "20px",
        }}
      >
        <Title level={4}>Kirim tafsilotlari</Title>
        <Space>
          <Button onClick={() => navigate(`/arrived/edit/${id}`)}>
            O‘zgartirish
          </Button>
          <Button danger onClick={handleDelete}>
            O‘chirish
          </Button>
        </Space>
      </Row>
      <ArrivedPageInfos currentId={currentId} />
      <ArrivedPageTable currentId={currentId} />
    </Card>
  );
}
