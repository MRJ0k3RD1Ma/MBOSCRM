import { useState } from "react";
import {
  Button,
  Card,
  Dropdown,
  Form,
  Input,
  Space,
  Table,
  Tooltip,
  type MenuProps,
} from "antd";

import { PlusOutlined, MoreOutlined, FilterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  useCreatePaidClient,
  useDeletePaidClient,
  useGetAllPaidClients,
  useUpdatePaidClient,
  type PaidClient,
  type PaidClientDto,
} from "../../config/queries/clients/paid-client-querys";
import { useGetAllClients } from "../../config/queries/clients/clients-querys";
import { useGetAllSale } from "../../config/queries/sale/sale-querys";
import { useGetAllPayments } from "../../config/queries/payment/payment-querys";
import PaidClientFilterModal from "./ui/paid-clients-filter-modal";
import PaidClientFormModal from "./ui/paid-clients-form-modal";

dayjs.extend(utc);
dayjs.extend(timezone);

const formatDate = (date: string) =>
  dayjs.utc(date).tz("Asia/Tashkent").format("YYYY-MM-DD HH:mm");

export default function ClientsPaid() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<PaidClient | null>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading } = useGetAllPaidClients({
    page,
    limit,
    ...(search ? { clientName: search } : {}),
    ...filters,
  });
  const { data: clients } = useGetAllClients({ page: 1, limit: 1000 });
  const { data: sales } = useGetAllSale({ page: 1, limit: 1000 });
  const { data: payments } = useGetAllPayments({ page: 1, limit: 1000 });

  const createPaidClient = useCreatePaidClient();
  const updatePaidClient = useUpdatePaidClient();
  const deletePaidClient = useDeletePaidClient();

  const onSubmit = (values: PaidClientDto) => {
    if (editing) {
      updatePaidClient.mutate({ id: editing.id, ...values });
    } else {
      createPaidClient.mutate(values);
    }
    setOpen(false);
    setEditing(null);
  };

  const handleEdit = (item: PaidClient) => {
    setEditing(item);
    form.setFieldsValue(item);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    deletePaidClient.mutate(id);
  };

  const columns = [
    {
      title: "Client ID",
      dataIndex: "clientId",
      render: (clientId: number) =>
        clients?.data.find((u) => u.id === clientId)?.name || "–",
    },

    {
      title: "Sale ID",
      dataIndex: "saleId",
      render: (saleId: number) =>
        sales?.data.find((u) => u.id === saleId)?.code || "–",
    },
    {
      title: "Payment ID",
      dataIndex: "paymentId",
      render: (paymentId: number) =>
        payments?.data.find((u) => u.id === paymentId)?.name || "–",
    },
    {
      title: "To‘lov sanasi",
      dataIndex: "paidDate",
      render: (date: string) => formatDate(date),
    },
    { title: "Narxi", dataIndex: "price" },
    {
      title: "Amallar",
      key: "actions",
      render: (_: any, row: PaidClient) => {
        const items: MenuProps["items"] = [
          {
            key: "edit",
            label: "Tahrirlash",
            onClick: () => handleEdit(row),
          },
          {
            key: "delete",
            label: "O‘chirish",
            danger: true,
            onClick: () => handleDelete(row.id),
          },
        ];

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Tooltip title="Boshqarish">
                <Button icon={<MoreOutlined />} />
              </Tooltip>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  return (
    <Card>
      <Space
        direction="horizontal"
        style={{
          width: "100%",
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Space>
          <Input.Search
            placeholder="Mijoz nomi bo‘yicha qidirish"
            allowClear
            enterButton
            onSearch={(val) => {
              setSearch(val);
              setPage(1);
            }}
            style={{ maxWidth: 300 }}
          />
          <Button
            icon={<FilterOutlined />}
            onClick={() => setFilterModalOpen(!filterModalOpen)}
          >
            Filter
          </Button>
        </Space>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditing(null);
            form.resetFields();
            setOpen(true);
          }}
        >
          Yangi to‘lov qo‘shish
        </Button>
      </Space>

      <PaidClientFilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={(values) => {
          setFilters(values);
          setPage(1);
        }}
        initialValues={filters}
      />

      <Table
        columns={columns}
        dataSource={data || []}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.length,
          onChange: (page) => setPage(page),
        }}
      />

      <PaidClientFormModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSubmit={onSubmit}
        initialValues={editing || undefined}
        clients={clients?.data || []}
        sales={sales?.data || []}
        payments={payments?.data || []}
        clientId={null}
        saleId={null}
      />
    </Card>
  );
}
