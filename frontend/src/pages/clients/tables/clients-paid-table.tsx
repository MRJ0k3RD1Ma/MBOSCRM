import { Button, Dropdown, Table, Tooltip, type MenuProps } from "antd";

import {
  useDeletePaidClient,
  useGetAllPaidClients,
  type PaidClient,
} from "../../../config/queries/clients/paid-client-querys";
import { indexColumn } from "../../../components/tables/indexColumn";
import { useGetAllClients } from "../../../config/queries/clients/clients-querys";
import { useGetAllSale } from "../../../config/queries/sale/sale-querys";
import { useGetAllPayments } from "../../../config/queries/payment/payment-querys";
import { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { MoreOutlined } from "@ant-design/icons";

dayjs.extend(utc);
dayjs.extend(timezone);

const formatDate = (date: string) =>
  dayjs.utc(date).tz("Asia/Tashkent").format("YYYY-MM-DD HH:mm");

export default function ClientsPaidTable({
  page,
  search,
  filters,
  setEditing,
  form,
  setOpen,
  setPage,
}: {
  page: number;
  search: string;
  filters: Record<string, any>;
  setEditing: (item: PaidClient) => void;
  form: any;
  setOpen: (open: boolean) => void;
  setPage: (page: number) => void;
}) {
  const [limit] = useState(10);
  const { data, isLoading } = useGetAllPaidClients({
    page,
    limit,
    ...(search ? { clientName: search } : {}),
    ...filters,
  });

  const deletePaidClient = useDeletePaidClient();
  const { data: clients } = useGetAllClients({ page: 1, limit: 1000 });
  const { data: sales } = useGetAllSale({ page: 1, limit: 1000 });
  const { data: payments } = useGetAllPayments({ page: 1, limit: 1000 });

  const handleEdit = (item: PaidClient) => {
    setEditing(item);
    form.setFieldsValue(item);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    console.log(id);

    deletePaidClient.mutate(id);
  };

  const columns = [
    indexColumn(page, limit),
    {
      title: "Mijoz",
      dataIndex: "clientId",
      render: (clientId: number) =>
        clients?.data.find((u) => u.id === clientId)?.name || "–",
    },

    {
      title: "Sotuv",
      dataIndex: "saleId",
      render: (saleId: number) =>
        sales?.data.find((u) => u.id === saleId)?.code || "–",
    },
    {
      title: "To'lov turi",
      dataIndex: "paymentId",
      render: (paymentId: number) =>
        payments?.data.find((u) => u.id === paymentId)?.name || "–",
    },
    {
      title: "To‘lov sanasi",
      dataIndex: "paidDate",
      render: (date: string) => formatDate(date),
    },
    {
      title: "Narxi",
      dataIndex: "price",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
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
    <div className="clients-paid-table">
      <Table
        columns={columns}
        dataSource={data?.data || []}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total || 0,
          onChange: (page) => setPage(page),
        }}
      />
    </div>
  );
}
