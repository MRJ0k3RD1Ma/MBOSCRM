import { useParams } from "react-router-dom";
import { useGetClientById } from "../../config/queries/clients/clients-querys";
import { Card, Input, Spin, Typography, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function ClientPage() {
  const { id } = useParams<{ id: string }>();
  const clientId = Number(id);
  const { data, isLoading } = useGetClientById(clientId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center mt-10">
        <Title level={3}>Client topilmadi</Title>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-xl">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-gray-200 rounded-xl w-40 h-40 flex items-center justify-center text-5xl">
            👤
          </div>
          <div className="w-full text-left">
            <Title level={4}>Foydalanuvchi ma’lumotlari</Title>
            <Button type="primary" icon={<PlusOutlined />}>
              Add contact
            </Button>
            <div className="mt-4 flex flex-col gap-3">
              <label>Name</label>
              <Input disabled value={data.name} />

              <label>Contact</label>
              <Input disabled value={data.phone || "—"} />

              <label>INN</label>
              <Input disabled value={data.inn || "—"} />

              <label>Address</label>
              <Input disabled value={data.address || "—"} />

              <label>Description</label>
              <Input disabled value={data.description || "—"} />
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex gap-2 mb-4">
            <Button type="primary">Lorem</Button>
            <Button> Lorem </Button>
            <Button> Lorem </Button>
            <Button> Lorem </Button>
            <Button> Lorem </Button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm h-full">
            <p>Bu yerda boshqa kontentlar yoki tablar joylashadi...</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
