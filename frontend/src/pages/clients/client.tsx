import { useParams } from "react-router-dom";
import {
  useGetClientById,
  useUpdateClient,
  useGetAllClients,
  type CreateClientInput,
} from "../../config/queries/clients/clients-querys";
import {
  Spin,
  Typography,
  Card,
  message,
  Form,
  Tabs,
  type TabsProps,
} from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import {
  useCreatePaidClient,
  type PaidClientDto,
} from "../../config/queries/clients/paid-client-querys";
import { useGetAllSale } from "../../config/queries/sale/sale-querys";
import PaidClientFormModal from "./ui/paid-clients-form-modal";
import { useGetAllPayments } from "../../config/queries/payment/payment-querys";
import ClientSubscribesNotpayingTable from "./tables/client-subscribes-notpaying-table copy";
import ClientSubscribesTable from "./tables/client-subscribes-table";
import ClientSalesTable from "./tables/client-sales-table";
import ClientPaidsTable from "./tables/client-paids-table";
import ClientSaleProductsTable from "./tables/client-sale-products-table";
import ClientInfos from "./ui/client-infos";
import ClientFormModal from "./ui/clients-form-modal";

const { Title } = Typography;

export default function ClientPage() {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const clientId = Number(id);

  const { data, isLoading, refetch } = useGetClientById(clientId);

  const { data: clients } = useGetAllClients({ page: 1, limit: 1000 });
  const { data: sales } = useGetAllSale({ page: 1, limit: 1000 });
  const { data: payments } = useGetAllPayments({ page: 1, limit: 1000 });

  const updateClient = useUpdateClient();
  const createPaidClient = useCreatePaidClient();

  const [paidOpen, setPaidOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const onSubmit = (values: PaidClientDto) => {
    createPaidClient.mutate(values);
    setPaidOpen(false);
  };

  const handleEdit = (values: CreateClientInput) => {
    try {
      updateClient.mutateAsync({ id: clientId, ...values });
      message.success("Mijoz yangilandi");
      setIsEditOpen(false);
      refetch();
    } catch (error) {
      message.error("Yangilashda xatolik yuz berdi");
    }
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

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "To'lanmagan obunalar",
      children: <ClientSubscribesNotpayingTable clientId={clientId} />,
    },
    {
      key: "2",
      label: "Obunalar",
      children: <ClientSubscribesTable clientId={clientId} />,
    },
    {
      key: "3",
      label: "Shartnomalar",
      children: <ClientSalesTable clientId={clientId} />,
    },
    {
      key: "4",
      label: "To'lovlar",
      children: <ClientPaidsTable clientId={clientId} />,
    },
    {
      key: "5",
      label: "Sotilgan mahsulotlar",
      children: <ClientSaleProductsTable clientId={clientId} />,
    },
  ];

  dayjs.extend(utc);
  dayjs.extend(timezone);

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <ClientInfos
        clientId={clientId}
        data={data}
        form={form}
        setIsEditOpen={setIsEditOpen}
        setPaidOpen={setPaidOpen}
      />

      <Card style={{ flex: 2 }} title="Mijozning qo‘shimcha ma’lumotlari">
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
        saleId={false}
      />
      <ClientFormModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleEdit}
        initialValues={data || undefined}
      />
    </div>
  );
}
